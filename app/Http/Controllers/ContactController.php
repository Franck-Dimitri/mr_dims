<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;

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

        try {
            $receiveAddress = env('MAIL_RECEIVE_ADDRESS', 'franckdimitri009@gmail.com');
            Mail::to($receiveAddress)->send(new ContactMessageMail($contact));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Erreur lors de l\'envoi du mail de contact: ' . $e->getMessage());
        }

        return back()->with('success', 'Votre message a bien été envoyé. Je vous réponds très vite !');
    }
}
