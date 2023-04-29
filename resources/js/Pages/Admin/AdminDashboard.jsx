import Navbar from "@/Layouts/Navbar";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";

export default function AdminDashboard({ auth, flash, member }) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome Admin</h2>}

        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <div className="space-x-5">
                            <PrimaryButton>
                                <Link
                                    href={route("users.index")}
                                >
                                    Manager Users
                                </Link>
                            </PrimaryButton>

                        </div>
                        <div className="space-x-5">
                            <PrimaryButton>
                                <Link
                                    href={route("rooms.index")}
                                >
                                    Manage Rooms
                                </Link>
                            </PrimaryButton>

                        </div>
                    </div>

                </div>
            </div>
        </Navbar>
    );
}
