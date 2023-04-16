import Navbar from "@/Layouts/Navbar";
import RoomCard from "@/Pages/Rooms/Partials/RoomCard";

export default function Index({ auth, rooms }) {
    console.log(rooms);
    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                <div className=" p-6 text-gray-900">
                    <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-6">
                        Rooms
                    </h1>
                   <div className="flex gap-8">
                       {rooms.map((room) => (
                           <RoomCard key={room.id} room={room} />
                       ))}
                   </div>
                </div>
            </div>
        </Navbar>
    );
}
