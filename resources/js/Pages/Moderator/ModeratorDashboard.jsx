import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link} from "@inertiajs/react";
import RoomCard from "@/Pages/Rooms/Partials/RoomCard";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ModeratorDashboard({ auth, rooms }) {
    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                <div className="p-10 text-gray-900">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Rooms You Moderate
                        </h2>
                            <PrimaryButton type="button">
                                <Link href={route("rooms.create")}>
                                    Create Room
                                </Link>
                            </PrimaryButton>
                    </div>

                    <ul className="flex space-x-3">
                        {rooms.length > 0 ? (
                            rooms?.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <div>
                                <p className="mb-4">
                                    You have not created any rooms yet.{" "}
                                </p>
                                <SecondaryButton type="button">
                                    <Link href={route("rooms.create")}>
                                        Create Room
                                    </Link>
                                </SecondaryButton>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </Navbar>
    );
}
