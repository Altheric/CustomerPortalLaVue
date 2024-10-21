<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Ticket;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Mail\NotificationMail;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource and sort it.
     */
    public function index()
    {
        $message = Message::all()->sortBy('created_at');;
        return response()->json($message);
    }

    /**
     * Store a newly created resource in storage and sent a notification email if this message is a response.
     */
    public function store(StoreMessageRequest $request)
    {
        $validated = $request->validated();

        $message = Message::create($validated);

        if($message->type == 'response'){
            //Email to user.
            $ticket = Ticket::with('user')->where('id', $message->ticket_id)->get()->first();
            $url = "http://127.0.0.1:8000/ticket/{$ticket->id}";
            Mail::to($ticket->user->email)->send(new NotificationMail($ticket->user, $url));
        }

        return response()->json($message);
    }   
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, int $id)
    {
        $validated = $request->validated();
        $message = Message::where('id', $id)->get()->first();
        $message->update($validated);

        return response()->json($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $message = Message::where('id', $id)->get()->first();
        $message->delete();
    }
}
