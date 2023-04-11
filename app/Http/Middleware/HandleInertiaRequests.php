<?php

namespace App\Http\Middleware;

use App\Models\Moderator;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $moderator = $user?->userable_type == "App\Models\Member"
            ?
            Moderator::where("member_id", $user->userable_id)
        :null;

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'moderatorId' => $moderator?->first()?->id
            ],
            'flash' => [
                'moderatorError' => fn () => $request->session()->get('moderator-error'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
