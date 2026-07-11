<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:make-mr-dims {email}')]
#[Description('Attribue le rôle mr_dims à un utilisateur spécifique par son email.')]
class MakeMrDims extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = \App\Models\User::where('email', $email)->first();

        if (!$user) {
            $this->error("Utilisateur avec l'email {$email} introuvable.");
            return;
        }

        $user->role = 'mr_dims';
        $user->save();

        $this->info("Félicitations ! L'utilisateur {$user->name} possède désormais le rôle exclusif 'mr_dims'.");
    }
}
