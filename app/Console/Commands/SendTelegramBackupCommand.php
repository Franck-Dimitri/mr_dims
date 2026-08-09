<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendTelegramBackupCommand extends Command
{
    /**
     * Le nom et la signature de la commande Artisan.
     *
     * @var string
     */
    protected $signature = 'backup:telegram';

    /**
     * La description de la commande.
     *
     * @var string
     */
    protected $description = 'Génère et expédie automatiquement la sauvegarde de la base de données sur Telegram à 02h00 AM';

    /**
     * Exécute la commande.
     */
    public function handle()
    {
        $botToken = config('services.telegram-bot.token') ?? env('TELEGRAM_BOT_TOKEN');
        $chatId = config('services.telegram-bot.chat_id') ?? env('TELEGRAM_CHAT_ID');

        if (empty($botToken) || empty($chatId)) {
            $this->error("TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID manquant dans le fichier .env !");
            Log::error("Échec backup:telegram : Identifiants Telegram manquants dans .env");
            return Command::FAILURE;
        }

        $this->info("Début de la génération de la sauvegarde automatique...");

        $backupDir = storage_path('app/backups');
        File::ensureDirectoryExists($backupDir);

        $now = now();
        $timestamp = $now->format('Ymd_His');
        $dateFormatted = $now->format('d/m/Y à H:i:s');
        
        $sqlitePath = database_path('database.sqlite');
        $filename = "portfolio_sqlite_{$timestamp}.sqlite.gz";
        $outputPath = "{$backupDir}/{$filename}";

        if (File::exists($sqlitePath)) {
            exec("gzip -c {$sqlitePath} > {$outputPath}");
        } else {
            $this->error("Fichier SQLite introuvable à {$sqlitePath}");
            Log::error("Fichier SQLite introuvable : {$sqlitePath}");
            return Command::FAILURE;
        }

        if (!File::exists($outputPath)) {
            $this->error("Échec de la création de l'archive de sauvegarde.");
            return Command::FAILURE;
        }

        $sizeMb = round(File::size($outputPath) / (1024 * 1024), 2);
        $projectName = config('app.name', 'Portfolio Mr Dim\'s');

        $caption = "⏰ <b>[SAUVEGARDE AUTOMATIQUE 02h00 AM]</b>\n\n"
            . "📌 <b>Projet :</b> <code>{$projectName}</code>\n"
            . "📅 <b>Date :</b> <code>{$dateFormatted}</code>\n"
            . "📄 <b>Fichier :</b> <code>{$filename}</code>\n"
            . "💾 <b>Taille :</b> <code>{$sizeMb} Mo</code>\n"
            . "✅ <b>Statut :</b> Sauvegarde quotidienne automatique réussie !";

        try {
            $url = "https://api.telegram.org/bot{$botToken}/sendDocument";

            $response = Http::timeout(60)
                ->attach('document', file_get_contents($outputPath), $filename)
                ->post($url, [
                    'chat_id' => $chatId,
                    'caption' => $caption,
                    'parse_mode' => 'HTML',
                ]);

            if ($response->successful()) {
                $this->info("Sauvegarde expédiée avec succès sur Telegram !");
                Log::info("Sauvegarde quotidienne de 02:00 AM envoyée avec succès à Telegram ({$filename}, {$sizeMb} Mo).");
                return Command::SUCCESS;
            } else {
                $this->error("Erreur Telegram API: " . $response->body());
                Log::error("Échec envoi document Telegram : " . $response->body());
                return Command::FAILURE;
            }
        } catch (\Throwable $e) {
            $this->error("Exception lors de l'envoi : " . $e->getMessage());
            Log::error("Exception backup:telegram : " . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
