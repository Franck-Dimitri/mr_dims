<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Programmer la sauvegarde automatique quotidienne Telegram à 02h00 AM
Schedule::command('backup:telegram')->dailyAt('02:00');
