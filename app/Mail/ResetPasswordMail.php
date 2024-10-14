<?php

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $url;
    /**
     * Create a new message instance.
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('motjebv@test.com', 'Motje Test'),
            subject: 'Wachtwoord Resetten',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.resetpassword',
            with: [
                'url' => $this->url,
            ],
        );
    }
}
