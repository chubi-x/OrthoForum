import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {useForm} from "@inertiajs/react";

export default function Show({auth, room }){
    const {get, delete:deleteRoomMethod, processing:processingRoom} = useForm();

    const deleteRoom = (roomId) => {
        deleteRoomMethod(route('rooms.destroy', [roomId]));
    };
    const editRoom = (roomId) => {
        get( route('rooms.edit', [roomId]) );
    }
    const showEditButton = () => {
        if(auth?.moderatorId && auth?.moderatorId === room.moderator_id){
            return <SecondaryButton onClick={() => editRoom(room.id)}
                                    disabled={processingRoom} className='inline'>
                Edit Room Details
            </SecondaryButton>;
        }
        return null;
    }
    const showDeleteButton = () => {
        if(auth?.moderatorId && auth?.moderatorId === room.moderator_id){
           return <SecondaryButton onClick={() => deleteRoom(room.id)}
                             disabled={processingRoom} className='inline'>
                Delete Room
            </SecondaryButton>
        }
        return null;
    }
    return (
       <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
           <div>
               <h1>Room</h1>
                <p>Room name: {room.name}</p>
                <p>Room description: {room.description}</p>
                <p>Room type: {room.type}</p>
               {showEditButton()}
                {showDeleteButton()}
                <img src={route('rooms.banner-path',[room.banner])} alt={room.name + ' banner'} />
           </div>
       </Navbar>
    )

}
