import Navbar from '@/Layouts/Navbar';
import {Head, Link, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";

export default function Dashboard({ auth,flash,member }) {

    // postLikedEvent();
    const {post} = useForm();
    //TODO: install react toastify and use to flash messages
    useEffect(() => {
        if(flash?.moderatorError){
            alert(flash.moderatorError);
        }
    },[flash?.moderatorError]);
    const becomeModerator = () => {
        post(route('moderator.store'),{
            preserveState: false,
            onSuccess: () => {
                alert("You are now a moderator!");
            }
        });
    }
    return (
        <Navbar
            user={auth?.user}
            moderatorId={auth?.moderatorId}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-10">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                    <div className="space-x-5">
                        <PrimaryButton>
                            <Link  href={route("posts.indexByUser",[auth?.user?.userable_id])}>
                                Posts
                            </Link>
                        </PrimaryButton>

                        { !auth?.moderatorId &&  <PrimaryButton onClick={becomeModerator}>
                            Become a Moderator
                        </PrimaryButton>}

                        {
                            auth?.moderatorId &&
                            <PrimaryButton >
                                <Link href={route('moderator.show',{id:auth?.moderatorId})}>
                                    Go to Moderator Dashboard
                                </Link>
                            </PrimaryButton>
                        }
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-10">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Rooms</h2>
                            <ul>
                                { member?.rooms.length > 0 ?  member?.rooms?.map((room) => {
                                    return <li key={room.id}>
                                        <Link href={route('rooms.show',[room.id])}>
                                            {room.name}
                                        </Link>
                                    </li>
                                })
                                :
                                    <div>
                                        <p>You are not a member of any room yet</p>
                                        <PrimaryButton>
                                        <Link href={route('rooms.index')}>
                                            Join a room
                                        </Link>
                                        </PrimaryButton>

                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
}
