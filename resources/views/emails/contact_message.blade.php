<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Nouveau message de contact</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f7f9;
            color: #333333;
            line-height: 1.6;
            margin: 0;
            padding: 40px 20px;
        }
        .wrapper {
            width: 100%;
            background-color: #f4f7f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #e1e8ed;
        }
        .header {
            background-color: #0ea5e9;
            color: #ffffff;
            padding: 25px 30px;
            text-align: left;
        }
        .header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .content {
            padding: 35px 30px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .info-table th {
            text-align: left;
            padding: 12px 15px;
            background-color: #f9fafb;
            color: #6b7280;
            font-size: 13px;
            font-weight: 600;
            width: 35%;
            border-bottom: 1px solid #e5e7eb;
            border-radius: 6px 0 0 6px;
        }
        .info-table td {
            padding: 12px 15px;
            font-size: 14px;
            color: #111827;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-table td a {
            color: #0ea5e9;
            text-decoration: none;
            font-weight: 500;
        }
        .message-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
        }
        .message-title {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 15px;
            text-transform: none;
        }
        .message-body {
            font-size: 15px;
            color: #374151;
            line-height: 1.7;
        }
        .attachment-notice {
            background-color: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 16px 20px;
            margin-bottom: 20px;
            border-radius: 0 6px 6px 0;
        }
        .attachment-notice p {
            margin: 0;
            font-size: 14px;
            color: #0369a1;
        }
        .footer {
            background-color: #f9fafb;
            padding: 25px 30px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h2>Nouvelle demande de contact</h2>
            </div>
            
            <div class="content">
                <table class="info-table">
                    <tr>
                        <th>Nom du contact</th>
                        <td>{{ $contact->name }}</td>
                    </tr>
                    <tr>
                        <th>Adresse e-mail</th>
                        <td><a href="mailto:{{ $contact->email }}">{{ $contact->email }}</a></td>
                    </tr>
                    <tr>
                        <th>Canal d'origine</th>
                        <td>{{ ucfirst($contact->platform_origin) }}</td>
                    </tr>
                    <tr>
                        <th>Date de réception</th>
                        <td>{{ $contact->created_at->format('d/m/Y à H:i') }}</td>
                    </tr>
                </table>

                <div class="message-box">
                    <div class="message-title">Contenu du message :</div>
                    <div class="message-body">
                        {!! nl2br(e($contact->message)) !!}
                    </div>
                </div>

                @if($contact->attachment_path)
                <div class="attachment-notice">
                    <p><strong>📎 Pièce jointe incluse :</strong> Un document a été transmis avec ce message. Vous le trouverez en pièce jointe de cet e-mail.</p>
                </div>
                @endif
            </div>

            <div class="footer">
                Ce message a été envoyé de manière automatisée depuis votre portfolio.<br>
                Pour répondre à l'expéditeur, cliquez simplement sur le bouton "Répondre" de votre messagerie.
            </div>
        </div>
    </div>
</body>
</html>
