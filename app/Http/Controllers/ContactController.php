<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use App\Services\TelegramService;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'platform_origin' => 'required|in:web,whatsapp',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('contacts_attachments', 'public');
            $validated['attachment_path'] = $path;
        }

        // On retire le fichier lui-même de l'array pour éviter l'erreur SQL
        unset($validated['attachment']);

        $contact = Contact::create($validated);

        // Notification instantanée sur Telegram
        try {
            $origin = $contact->platform_origin === 'whatsapp' ? '📱 WhatsApp' : '🌐 Formulaire Web';
            $msg = "⚡ <b>NOUVEAU MESSAGE REÇU SUR MR DIMS DEV !</b>\n\n";
            $msg .= "👤 <b>Expéditeur :</b> " . htmlspecialchars($contact->name) . "\n";
            $msg .= "✉️ <b>Email :</b> " . htmlspecialchars($contact->email) . "\n";
            $msg .= "📡 <b>Canal :</b> {$origin}\n";
            $msg .= "💬 <b>Message :</b>\n" . htmlspecialchars($contact->message) . "\n";
            if (!empty($contact->attachment_path)) {
                $msg .= "\n📎 <b>Pièce jointe :</b> " . url('storage/' . $contact->attachment_path) . "\n";
            }
            $msg .= "\n⏰ " . now()->setTimezone('Africa/Douala')->format('d/m/Y à H:i:s');
            TelegramService::sendMessage($msg);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Erreur Telegram contact: ' . $e->getMessage());
        }

        try {
            $receiveAddress = env('MAIL_RECEIVE_ADDRESS', 'contact@mrdims.dev');
            Mail::to($receiveAddress)->send(new ContactMessageMail($contact));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Erreur lors de l\'envoi du mail de contact: ' . $e->getMessage());
        }

        return back()->with('success', 'Votre message a bien été envoyé. Je vous réponds très vite !');
    }
}
