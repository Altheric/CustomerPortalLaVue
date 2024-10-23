<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ConfirmRegisterMail;
Use App\Mail\ResetPasswordMail;
use App\Http\Requests\ValidatePasswordRequest;
use App\Http\Requests\PasswordUpdateRequest;
use Exception;
use App\Models\PasswordResetToken;

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
            return new JsonResponse(null, 200);

        } else {
            return new JsonResponse(null, 406); 
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
        $validated = $request->validated();
        try{
            $user = User::create($validated);
            Mail::to($user->email)->send(new ConfirmRegisterMail($user));

            return new JsonResponse(null, 200);
        } catch(Exception $error) {
            return new JsonResponse([
                'status' => $error->getMessage()
            ]);
        }
    }
    /**
     * Send an email to reset the email-holder's password.
     */
    public function forgotPassword(ValidatePasswordRequest $request){
        $validated = $request->validated();
        $resetToken = Str::random(40);
        $user =  User::where('email', $validated['email'])->get()->first();
        PasswordResetToken::create([
            'email' => $validated['email'],
            'token' => $resetToken
        ]);
        $resetURL = env('APP_URL') + ":8000/wachtwoord-vergeten/{$resetToken}/{$validated['email']}";

        Mail::to($user['email'])->send(new ResetPasswordMail($resetURL));

        return new JsonResponse(null, 200);
    }
    /**
     * Update the password if the token and email exists in PasswordResetToken.
     */
    public function updatePassword(PasswordUpdateRequest $request){
        $validated = $request->validated();
        $passReset = PasswordResetToken::where('email', $validated['email'])->get()->first();
        if($passReset->token == $validated['token']){
            $user = User::where('email', $validated['email'])->get()->first();
            $user->update(['password' => $validated['password']]);
            return new JsonResponse(null, 200);
        } else {
            return new JsonResponse(null, 404);
        }
    }
    /**
     * Remove the PasswordResetRequest from the table after a succesful password update.
     */
    public function clearToken($email){
        $passReset = PasswordResetToken::where('email', $email)->get()->first();

        $passReset->delete();

        return new JsonResponse(null, 200);
    }
}
