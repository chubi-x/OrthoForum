<?php

namespace App\Http\Middleware;

use App\Models\Moderator;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class CheckIsModerator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if(!$user->userable_type == "App\Models\Member") {
            return Redirect::route("dashboard");
        }
        $isModerator = Moderator::where("member_id", $user->userable_id)->exists();
        if (! $isModerator) {
            return Redirect::route("dashboard")->with("moderator-error", "You are not a moderator!");
        }
        return $next($request);
    }
}
