import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link} from "@inertiajs/react";

export default function ModeratorDashboard({auth, rooms}){

    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div>
                <h1>Moderator Dashboard</h1>
                <h1> {rooms.length> 0 ? 'Rooms': 'You have no rooms. Click the button below to create one.'} </h1>

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
                            <p>{room.description}</p>
                            <p>{room.type}</p>
                        </div>
                    ))
                }
                <SecondaryButton type="button">
                    <Link href={route('rooms.create')}>
                        Create Room
                    </Link>
                </SecondaryButton>

            </div>
        </Navbar>
    )
}
