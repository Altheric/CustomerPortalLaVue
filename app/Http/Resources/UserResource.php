<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
class UserResource extends JsonResource
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
            'created_at' => $this->when($request->user('sanctum')->is_admin, $this->created_at),
            'updated_at' => $this->when($request->user('sanctum')->is_admin, $this->updated_at),
            'name' => $this->name,
            'email' => $this->when($request->user('sanctum')->is_admin, $this->email),
            'email_verified_at' => $this->when($request->user('sanctum')->is_admin, $this->email_verified_at),
            'is_admin' => $this->is_admin,
        ];
    }
}
