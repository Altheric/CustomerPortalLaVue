<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Resources\TicketResource;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Requests\UpdateTicketAssignedRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\JsonResponse;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TicketResource::collection(Ticket::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validated();

        $ticket = Ticket::create($validated);

        return new TicketResource($ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $validated = $request->validated();
        $ticket->update($validated);

        return new TicketResource($ticket);
    }   
    /**
     * Update the admin_id and status on the specified resource in storage.
     */
    public function updateAssigned(UpdateTicketAssignedRequest $request, Ticket $ticket)
    {
        $validated = $request->validated();
        $ticket->update([
            'admin_id' => $validated['admin_id'], 
            'status' => $validated['status']
        ]);

        return new TicketResource($ticket);
    }   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return new JsonResponse(200);
    }
}
