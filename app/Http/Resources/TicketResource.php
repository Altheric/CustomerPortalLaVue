<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
            'category_id' => $this->category_id,
            'user_id' => $this->user_id,
            'admin_id' => $this->when($request->user('sanctum')->is_admin, $this->admin_id),
        ];
    }
}
