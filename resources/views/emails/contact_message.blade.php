<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: monospace; background-color: #f9fafb; color: #1a1a1a; line-height: 1.6; }
        .container { max-w-[600px]; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; }
        .header { border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; margin-bottom: 20px; }
        .footer { font-size: 10px; color: #6b7280; text-align: center; margin-top: 30px; padding-top: 10px; border-top: 1px dashed #e5e7eb; }
        .label { font-weight: bold; color: #0ea5e9; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
        .content { margin-bottom: 20px; padding: 15px; background-color: #f3f4f6; border-left: 3px solid #0ea5e9; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>[ SYSTEM NOTIFICATION ] NOUVEAU CONTACT</h3>
        </div>
        
        <div>
            <p><span class="label">ID_ENTITÉ (NOM) :</span> {{ $contact->name }}</p>
            <p><span class="label">END_POINT (EMAIL) :</span> <a href="mailto:{{ $contact->email }}">{{ $contact->email }}</a></p>
            <p><span class="label">PLATEFORME :</span> {{ strtoupper($contact->platform_origin) }}</p>
            <p><span class="label">DATE :</span> {{ $contact->created_at->format('d/m/Y H:i:s') }}</p>
        </div>

        <div class="content">
            <span class="label">PAYLOAD (MESSAGE) :</span><br>
            {!! nl2br(e($contact->message)) !!}
        </div>

        @if($contact->attachment_path)
        <div>
            <p><span class="label">PIÈCE JOINTE :</span> Ce message contient une pièce jointe que vous retrouverez avec ce mail.</p>
        </div>
        @endif

        <div class="footer">
            MESSAGE GÉNÉRÉ AUTOMATIQUEMENT PAR L'INTERFACE DU PORTFOLIO.
        </div>
    </div>
</body>
</html>
