<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Requests\UpdateTicketAssignedRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::with('user')->get();
        return response()->json($tickets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validated();

        $ticket = Ticket::with('user')->create($validated);

        return response()->json($ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $validated = $request->validated();
        // $ticket = Ticket::with('user')->where('id', $id)->get()->first();
        $ticket->update($validated);

        return response()->json($ticket);
    }   
    /**
     * Update the admin_id in the specified resource in storage.
     */
    public function updateAssigned(UpdateTicketAssignedRequest $request, $id)
    {
        $validated = $request->validated();
        $ticket = Ticket::with('user')->where('id', $id)->get()->first();
        $ticket->update([
            'admin_id' => $validated['admin_id'], 
            'status' => $validated['status']
        ]);

        return response()->json($ticket);
    }   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        
    }
}
