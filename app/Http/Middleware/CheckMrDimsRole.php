<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckMrDimsRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || auth()->user()->role !== 'mr_dims') {
            return \Inertia\Inertia::render('Auth/Unauthorized')->toResponse($request)->setStatusCode(403);
        }

        return $next($request);
    }
}
