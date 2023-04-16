import Navbar from "@/Layouts/Navbar";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import RoomCard from "@/Pages/Rooms/Partials/RoomCard";

export default function Dashboard({ auth, flash, member }) {
    // postLikedEvent();
    const { post } = useForm();
    //TODO: install react toastify and use to flash messages
    useEffect(() => {
        if (flash?.moderatorError) {
            alert(flash.moderatorError);
        }
    }, [flash?.moderatorError]);
    const becomeModerator = () => {
        post(route("moderator.store"), {
            preserveState: false,
            onSuccess: () => {
                alert("You are now a moderator!");
            },
        });
    };
    return (
        <Navbar
            user={auth?.user}
            moderatorId={auth?.moderatorId}

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-x-5">
                        <PrimaryButton>
                            <Link
                                href={route("posts.indexByUser", [
                                    auth?.user?.userable_id,
                                ])}
                            >
                                Posts
                            </Link>
                        </PrimaryButton>

                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                        <div className="p-6 text-gray-900 ">
                           <div className="flex justify-between items-center mb-6">
                               <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                   Your Rooms
                               </h2>

                               {!auth?.moderatorId ? (
                                   <PrimaryButton onClick={becomeModerator}>
                                       Become a Moderator
                                   </PrimaryButton>
                               )
                                    :
                               (

                            <PrimaryButton>
                                <Link href={route('moderator.show', {id: auth?.moderatorId})}>
                                    Moderator Dashboard
                                </Link>
                            </PrimaryButton>
                               )

                               }

                           </div>
                            <ul className="flex space-x-3">
                                {member?.rooms.length > 0 ? (
                                    member?.rooms?.map((room) => (
                                        <RoomCard key={room.id} room={room} />
                                    ))
                                ) : (
                                    <div>
                                        <p className="mb-4">
                                            You are not a member of any room
                                            yet.{" "}
                                        </p>
                                        <PrimaryButton>
                                            <Link href={route("rooms.index")}>
                                                Join a room
                                            </Link>
                                        </PrimaryButton>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
}
