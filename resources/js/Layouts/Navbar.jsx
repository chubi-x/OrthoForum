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

    const emitNotification = (eventStateName, eventStateItemBool, setEventState,stateMessage) => {
        if (user && eventStateName[eventStateItemBool]) {
            toast(eventStateName[stateMessage]);
            setEventState({
                [eventStateItemBool]: false,
                [stateMessage]: ''
            })
        }
    }
    useEffect(() => {
        emitNotification(postLikedEmitted, 'postLiked', setPostLikedEmitted, 'message');
    }, [postLikedEmitted]);

    useEffect(() => {
        emitNotification(postCommentedEmitted, 'postCommented', setPostCommentedEmitted, 'message');
    }, [postCommentedEmitted]);

    useEffect(() => {
        emitNotification(postDeletedEmitted, 'postDeleted', setPostDeletedEmitted, 'message');
    }, [postDeletedEmitted]);

    const listenForNotifications = (channel, eventName, setData, data, message) => {
        if(user){
            Echo.private(`${channel}.${user?.id}`)
                .listen(eventName, (event) => {
                    setData({
                        [data]:true,
                        [message]: event.message,
                    });
                });
        }
    }
    listenForNotifications('post-liked-channel', 'PostLiked', setPostLikedEmitted, 'postLiked', 'message');
    listenForNotifications('moderator-deleted-post-channel', 'ModeratorDeletedPost', setPostDeletedEmitted, 'postDeleted', 'message');
    listenForNotifications('commented-on-post-channel', 'CommentedOnPost', setPostCommentedEmitted, 'postCommented', 'message');


    return (
        <>

            <div className="min-h-screen bg-gray-100">
                <nav className="bg-orange-200 border-b border-gray-100 py-2 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="shrink-0 py-10 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-16 w-auto fill-current text-gray-800" />
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
                                                <Dropdown.Link href={route('account.edit')}>Account</Dropdown.Link>

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
                                <ResponsiveNavLink href={route('account.edit')}>Account</ResponsiveNavLink>
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
