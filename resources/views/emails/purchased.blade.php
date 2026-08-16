<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre facture et vos accès</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #F8FAFC;
            color: #1E293B;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #FFFFFF;
            border-radius: 20px;
            border: 1px solid #E2E8F0;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 0 !important;
                border-radius: 0 !important;
                border: none !important;
                width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
        }
        .header {
            background-color: #4F46E5;
            padding: 40px 30px;
            text-align: center;
            color: #FFFFFF;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            color: #E0E7FF;
            font-weight: 500;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .message {
            font-size: 14px;
            color: #475569;
            margin-bottom: 25px;
        }
        .access-box {
            background-color: #F1F5F9;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        .product-title {
            font-size: 15px;
            font-weight: 800;
            color: #0F172A;
            margin-bottom: 5px;
        }
        .product-desc {
            font-size: 12px;
            color: #64748B;
            margin-bottom: 15px;
        }
        .btn-access {
            display: inline-block;
            background-color: #4F46E5;
            color: #FFFFFF !important;
            text-decoration: none;
            padding: 12px 30px;
            font-size: 12px;
            font-weight: 700;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }
        .invoice-details {
            border-top: 1px solid #F1F5F9;
            padding-top: 25px;
            margin-top: 25px;
        }
        .invoice-details h2 {
            font-size: 12px;
            font-weight: 800;
            color: #0F172A;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 15px;
        }
        .invoice-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            padding: 6px 0;
            color: #475569;
        }
        .invoice-row strong {
            color: #0F172A;
        }
        .invoice-total {
            border-top: 2px double #E2E8F0;
            margin-top: 10px;
            padding-top: 10px;
            font-size: 15px;
            font-weight: 800;
            color: #4F46E5;
        }
        .footer {
            background-color: #F8FAFC;
            padding: 20px 30px;
            text-align: center;
            font-size: 11px;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Votre Facture & Accès</h1>
            <p>Commande {{ $order->order_hash }} • Paiement Reçu</p>
        </div>

        <div class="content">
            <div class="greeting">Bonjour {{ $order->customer_name }},</div>
            <div class="message">
                Nous vous remercions pour votre achat. Votre paiement a été validé avec succès. Vous trouverez ci-dessous le lien pour accéder immédiatement à vos ressources numériques.
            </div>

            <!-- Access Section -->
            <div class="access-box">
                <div class="product-title">{{ $order->product->title }}</div>
                <div class="product-desc">
                    @if($order->product->access_type === 'drive')
                        Votre ressource est disponible sur un dossier Google Drive partagé.
                    @else
                        Votre ressource est prête pour le téléchargement direct sur notre serveur sécurisé.
                    @endif
                </div>
                
                @php
                    $accessUrl = $order->product->access_type === 'drive' 
                        ? ($order->product->access_url ?? 'https://drive.google.com') 
                        : route('private.download', $order->order_hash);
                @endphp
                
                <a href="{{ $accessUrl }}" class="btn-access" target="_blank">
                    @if($order->product->access_type === 'drive')
                        Accéder au dossier Google Drive
                    @else
                        Télécharger ma ressource
                    @endif
                </a>
            </div>

            <!-- Invoice Details -->
            <div class="invoice-details">
                <h2>Détails de la facturation</h2>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #475569;">
                    <tr>
                        <td style="padding: 6px 0;"><strong>Référence Commande :</strong></td>
                        <td style="padding: 6px 0; text-align: right; font-family: monospace;">#{{ $order->order_hash }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0;"><strong>Date :</strong></td>
                        <td style="padding: 6px 0; text-align: right;">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0;"><strong>Mode de Paiement :</strong></td>
                        <td style="padding: 6px 0; text-align: right; text-transform: uppercase;">{{ str_replace('_', ' ', $order->payment_method) }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0;"><strong>Email Client :</strong></td>
                        <td style="padding: 6px 0; text-align: right;">{{ $order->customer_email }}</td>
                    </tr>
                    <tr style="border-top: 1px solid #E2E8F0; font-size: 15px; font-weight: 800; color: #4F46E5;">
                        <td style="padding: 12px 0;">Total Réglé :</td>
                        <td style="padding: 12px 0; text-align: right;">{{ number_format($order->amount, 0, ',', ' ') }} FCFA</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="footer">
            Cet email a été envoyé automatiquement. Veuillez ne pas y répondre directement.<br>
            © {{ date('Y') }} Ressources Digitales. Tous droits réservés.
        </div>
    </div>
</body>
</html>
