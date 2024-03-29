import {Head, Link} from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton";

export default function Welcome({ auth}) {
    return (
        <>
            <Head title="Welcome" />
            <div
                style={
                {"backgroundImage": `url('/public/1.JPG)`, "backgroundSize": "cover"
                }
            }
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div>
                    <h1 className="mb-5 font-bold">
                        Welcome to OrthoForum!
                    </h1>
                    <SecondaryButton className="w-full py-4 justify-center" type="button" >
                        <Link href={route('rooms.index')}>Join a room</Link>
                    </SecondaryButton>


                </div>
            </div>
        </>
    );
}
