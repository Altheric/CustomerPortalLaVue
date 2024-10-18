<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
use App\Models\User;

class NotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user, $url;
    /**
     * Create a new message instance.
     */
    public function __construct(User $user, string $url)
    {
        $this->user = $user;
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('motjebv@test.com', 'Motje Test'),
            subject: 'Nieuwe Reactie',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.notification',
            with: [
                'user' => $this->user,
                'url' => $this->url,
            ],
        );
    }
}
