<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'platform_origin' => 'required|in:web,whatsapp',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Votre message a bien été envoyé. Je vous réponds très vite !');
    }
}
