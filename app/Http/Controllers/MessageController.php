<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Mail\NotificationMail;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource and sort it.
     */
    public function index(Request $request)
    {
        if($request->user('sanctum')->is_admin){
            return MessageResource::collection(Message::all()->sortBy('created_at'));
        } else {
            return MessageResource::collection(Message::where('type', 'response')->get()->sortBy('created_at'));
        }
    }
    /**
     * Display a listing of the resource with the given ticket id
     */
    public function showForTicket(Request $request, int $id){
        if($request->user('sanctum')->is_admin){
            return MessageResource::collection(Message::where('ticket_id', $id)->get()->sortBy('created_at'));
        } else {
            return MessageResource::collection(Message::where('ticket_id', $id)->where('type', 'response')->get()->sortBy('created_at'));
        }
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
            $url = env('APP_URL') + ":8000/ticket/{$ticket->id}";
            Mail::to($ticket->user->email)->send(new NotificationMail($ticket->user, $url));
        }

        return new MessageResource($message);
    }   
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        $validated = $request->validated();

        $message->update($validated);

        return new MessageResource($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();

        return new JsonResponse(null, 200);
    }
}
