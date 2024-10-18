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

        Ticket::create($validated);

        return new JsonResponse([
            'status' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, $id)
    {
        $validated = $request->validated();
        $ticket = Ticket::where('id', $id)->get()->first();
        $ticket->update($validated);

        return new JsonResponse([
            'status' => 200
        ]);
    }   
    /**
     * Update the admin_id in the specified resource in storage.
     */
    public function updateAssigned(UpdateTicketAssignedRequest $request, $id)
    {
        $validated = $request->validated();
        $ticket = Ticket::where('id', $id)->get()->first();
        $ticket->update([
            'admin_id' => $validated['admin_id'], 
            'status' => $validated['status']
        ]);

        return new JsonResponse([
            'status' => 200
        ]);
    }   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
