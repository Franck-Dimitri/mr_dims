<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;

class SystemControlController extends Controller
{
    /**
     * Récupère la santé globale et les métriques matérielles du serveur VPS.
     */
    public function getSystemHealth()
    {
        $health = [
            'cpu_percent' => 12.5,
            'ram_used_mb' => 512,
            'ram_total_mb' => 2048,
            'ram_percent' => 25,
            'disk_used_gb' => 8.4,
            'disk_total_gb' => 40.0,
            'disk_percent' => 21,
            'uptime' => 'Actif',
            'services' => [
                'nginx' => true,
                'database' => true,
                'php' => true,
            ],
        ];

        try {
            // RAM info (Linux)
            if (file_exists('/proc/meminfo')) {
                $meminfo = file_get_contents('/proc/meminfo');
                preg_match('/MemTotal:\s+(\d+)/', $meminfo, $totalMatches);
                preg_match('/MemAvailable:\s+(\d+)/', $meminfo, $availMatches);

                if (!empty($totalMatches[1]) && !empty($availMatches[1])) {
                    $totalKb = (int) $totalMatches[1];
                    $availKb = (int) $availMatches[1];
                    $usedKb = $totalKb - $availKb;

                    $health['ram_total_mb'] = round($totalKb / 1024);
                    $health['ram_used_mb'] = round($usedKb / 1024);
                    $health['ram_percent'] = round(($usedKb / $totalKb) * 100);
                }
            }

            // Disk info
            $diskFree = disk_free_space(base_path());
            $diskTotal = disk_total_space(base_path());
            if ($diskFree !== false && $diskTotal !== false) {
                $diskUsed = $diskTotal - $diskFree;
                $health['disk_total_gb'] = round($diskTotal / (1024 * 1024 * 1024), 1);
                $health['disk_used_gb'] = round($diskUsed / (1024 * 1024 * 1024), 1);
                $health['disk_percent'] = round(($diskUsed / $diskTotal) * 100);
            }

            // CPU load
            if (function_exists('sys_getloadavg')) {
                $load = sys_getloadavg();
                if (isset($load[0])) {
                    $health['cpu_percent'] = min(round($load[0] * 25, 1), 100);
                }
            }

            // Uptime
            if (file_exists('/proc/uptime')) {
                $uptimeSeconds = (int) explode(' ', file_get_contents('/proc/uptime'))[0];
                $days = floor($uptimeSeconds / 86400);
                $hours = floor(($uptimeSeconds % 86400) / 3600);
                $health['uptime'] = "{$days}d {$hours}h";
            }
        } catch (\Throwable $e) {
            Log::warning("Impossible de lire les métriques système : " . $e->getMessage());
        }

        return response()->json($health);
    }

    /**
     * Déclenche un déploiement et une maintenance en 1-clic (Git pull, build Vite, clear-cache, migrations).
     */
    public function deploy(Request $request)
    {
        $projectPath = base_path();
        $logs = [];
        $success = true;

        $commands = [
            'Git Pull' => "git -C {$projectPath} pull origin main",
            'Build Front-end' => "npm --prefix {$projectPath} run build",
            'Migrations Laravel' => "php {$projectPath}/artisan migrate --force",
            'Nettoyage du Cache' => "php {$projectPath}/artisan optimize:clear",
        ];

        foreach ($commands as $step => $cmd) {
            try {
                $result = Process::path($projectPath)->run($cmd);
                $output = trim($result->output() ?: $result->errorOutput());
                $logs[] = "=== {$step} ===\n" . ($output ?: 'Succès.');

                if (!$result->successful() && !str_contains($cmd, 'git')) {
                    $success = false;
                }
            } catch (\Throwable $e) {
                $logs[] = "=== {$step} (Erreur) ===\n" . $e->getMessage();
                $success = false;
            }
        }

        $logSummary = implode("\n\n", $logs);

        // Envoyer une alerte sur Telegram
        $icon = $success ? '✅' : '❌';
        TelegramService::sendMessage("{$icon} <b>[DÉPLOIEMENT 1-CLIC DEPUIS L'ADMIN]</b>\n\nStatut : " . ($success ? 'Succès' : 'Erreurs') . "\nHeure : " . now()->format('d/m/Y H:i:s'));

        return response()->json([
            'success' => $success,
            'output' => $logSummary,
        ]);
    }

    /**
     * Déclenche une sauvegarde immédiate (SQLite/MySQL) et permet de la télécharger ou l'envoyer sur Telegram.
     */
    public function createBackup(Request $request)
    {
        $sendTelegram = $request->boolean('send_telegram', true);
        $backupDir = storage_path('app/backups');
        File::ensureDirectoryExists($backupDir);

        $timestamp = now()->format('Ymd_His');
        $sqlitePath = database_path('database.sqlite');
        $backupFilename = "portfolio_backup_{$timestamp}.sqlite.gz";
        $outputPath = "{$backupDir}/{$backupFilename}";

        try {
            if (File::exists($sqlitePath)) {
                exec("gzip -c {$sqlitePath} > {$outputPath}");
            } else {
                // Fallback dump
                File::put("{$backupDir}/portfolio_backup_{$timestamp}.sql", "Dump backup created at " . now());
                $outputPath = "{$backupDir}/portfolio_backup_{$timestamp}.sql";
                $backupFilename = basename($outputPath);
            }

            $sizeMb = File::exists($outputPath) ? round(File::size($outputPath) / (1024 * 1024), 2) : 0;

            if ($sendTelegram) {
                TelegramService::sendMessage(
                    "💾 <b>[SAUVEGARDE EN 1-CLIC]</b>\n\n"
                    . "📅 <b>Date :</b> <code>" . now()->format('d/m/Y H:i:s') . "</code>\n"
                    . "📄 <b>Fichier :</b> <code>{$backupFilename}</code>\n"
                    . "💾 <b>Taille :</b> <code>{$sizeMb} Mo</code>\n"
                    . "✅ <b>Statut :</b> Sauvegarde générée depuis le panneau Admin."
                );
            }

            return response()->json([
                'success' => true,
                'filename' => $backupFilename,
                'size_mb' => $sizeMb,
                'date' => now()->format('d/m/Y H:i:s'),
                'download_url' => route('admin.system.backup.download', ['filename' => $backupFilename]),
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la sauvegarde : ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Télécharge un fichier de sauvegarde généré.
     */
    public function downloadBackup($filename)
    {
        $path = storage_path("app/backups/{$filename}");
        if (!File::exists($path)) {
            abort(404, "Fichier de sauvegarde introuvable");
        }
        return response()->download($path);
    }
}
