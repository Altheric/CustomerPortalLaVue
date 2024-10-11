<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
   
     /**
     * Check the database for the given user data.
     */
    public function currentUser(Request $request)
    {
        return new JsonResponse([
            'user' => $request->user('sanctum')
        ]);
    }
     /**
     * Login the user with valid credentials
     */
    public function login(LoginRequest $request){
        $validated = $request->validated();

        $user = User::where('email',$validated['email'])->first();

        if($user != null && Hash::check($validated['password'], $user->password)){

            Auth::login($user);

            $request->session()->regenerate();
            return new JsonResponse([
                'user' => $user,
                'status' => 200
            ]);

        } else {
            return new JsonResponse([
                'user' => null,
                'status' => 406
            ]); 
        }
    }
    /**
     * Logout the current user and expunge their data
     */
    public function logout(Request $request){
        Auth::guard('web')->logout();

        $request->session()->invalidate();
 
        $request->session()->regenerateToken();

        return new JsonResponse([
            'status' => 200
        ]);
    }
    /**
     * Register the user. 
     */
    public function register(RegisterRequest $request){
        
    }
}
