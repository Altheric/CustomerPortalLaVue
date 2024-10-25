<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use App\Policies\AuthPolicy;
use App\Policies\UserPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\MessagePolicy;
use App\Policies\TicketPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //This is here because otherwise vue will read the arrays as an object.
        JsonResource::withoutWrapping();

        Gate::define('auth-store', [AuthPolicy::class, 'store']);

        Gate::define('user-update', [UserPolicy::class, 'update']);

        Gate::define('category-store', [CategoryPolicy::class, 'store']);
        Gate::define('category-update', [CategoryPolicy::class, 'update']);

        Gate::define('ticket-store', [TicketPolicy::class, 'store']);
        Gate::define('ticket-update', [TicketPolicy::class, 'update']);
        Gate::define('ticket-assign', [TicketPolicy::class, 'assign']);

        Gate::define('message-store', [MessagePolicy::class, 'store']);
        Gate::define('message-update', [MessagePolicy::class, 'update']);
    }
}
