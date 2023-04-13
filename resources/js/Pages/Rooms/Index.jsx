import Navbar from "@/Layouts/Navbar";
import {Link} from "@inertiajs/react";

export default function Index({auth, rooms}){
    return (
        <Navbar
            user={auth.user}
            moderatorId={auth?.moderatorId}
        >
            <div>
                <h1>Rooms</h1>
                {
                    rooms.map((room) => (
                        <div key={room.id}>
                            <h2>
                                <Link href={route('rooms.show',[room.id])}>
                                    <u>
                                        {room.name}
                                    </u>
                                </Link>
                            </h2>
                            <p>Room description: {room.description}</p>
                            <p>Room type: {room.type}</p>
                            <img src={route('rooms.banner-path',[room.banner])} alt={room.name + ' banner'} />
                        </div>
                    ))
                }
            </div>
        </Navbar>
    )
}
