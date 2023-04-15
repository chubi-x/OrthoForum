import {useEffect, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link} from '@inertiajs/react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar({ user, moderatorId, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [postLikedEmitted, setPostLikedEmitted] = useState({
        postLiked: false,
        message: '',
    });
    const [postCommentedEmitted, setPostCommentedEmitted] = useState({
        postCommented: false,
        message: '',
    });
    const [postDeletedEmitted, setPostDeletedEmitted] = useState({
        postDeleted: false,
        message: '',
    });
    useEffect(() => {
        if (postLikedEmitted.postLiked) {
            toast(postLikedEmitted.message);
            setPostLikedEmitted({
                postLiked: false,
                message: ''
            })
        }
    }, [postLikedEmitted]);

    useEffect(() => {
        if (postCommentedEmitted.postCommented) {
            toast(postCommentedEmitted.message);
            setPostCommentedEmitted({
                postCommented: false,
                message: ''
            })
        }
    }, [postCommentedEmitted]);

    useEffect(() => {
        if (postDeletedEmitted.postDeleted) {
            toast(postDeletedEmitted.message);
            setPostDeletedEmitted({
                postDeleted: false,
                message: ''
            })
        }
    }, [postDeletedEmitted]);

    Echo.private(`post-liked-channel.${user.id}`)
        .listen('PostLiked', (event) => {
            setPostLikedEmitted({
                postLiked: true,
                message: event.message,
            })
        });
    Echo.private(`moderator-deleted-post-channel.${user.id}`)
        .listen('ModeratorDeletedPost', (event) => {
            setPostDeletedEmitted({
                postDeleted: true,
                message: event.message,
            })
        });
    Echo.private(`commented-on-post-channel.${user.id}`)
        .listen('CommentedOnPost', (event) => {
            setPostCommentedEmitted({
                postCommented: true,
                message: event.message,
            })
        });

    return (
        <>

            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                { user && <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                </div>
                                }

                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                {user &&
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink>
                                            <span className="sr-only">Notifications</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                />
                                            </svg>
                                        </NavLink>
                                    </div>
                                }
                                { user ? <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.username}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>

                                                { moderatorId && <Dropdown.Link href={route('moderator.show', {id: moderatorId})}
                                                                                method="get" as="button">
                                                    Moderator Dashboard
                                                </Dropdown.Link>
                                                }
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>

                                    :
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('register')} active={route().current('dashboard')}>
                                            Register
                                        </NavLink>

                                        <NavLink href={route('login')} active={route().current('dashboard')}>
                                            Login
                                        </NavLink>
                                    </div>
                                }
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {user && <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-2 pb-3 space-y-1">
                            { moderatorId &&  <ResponsiveNavLink href={route('moderator.show', {id: moderatorId})} active={route().current('moderator.show')}>
                                Moderator Dashboard
                            </ResponsiveNavLink>
                            }

                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div
                                    className="font-medium text-base text-gray-800 dark:text-gray-200">{user?.username}</div>
                                <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>}
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
            <ToastContainer />
        </>
    );

}
