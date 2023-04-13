import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link, useForm} from "@inertiajs/react";

export default function Show({auth, room,isModerator,moderator,posts }){
    const {get, delete:deleteRoomMethod, processing:processingRoom} = useForm();
    const deleteRoom = (roomId) => {
        deleteRoomMethod(route('rooms.destroy', [roomId]));
    };
    const editRoom = (roomId) => {
        get( route('rooms.edit', [roomId]) );
    }
    const showEditButton = () => {
        if(isModerator){
            return <SecondaryButton onClick={() => editRoom(room.id)}
                                    disabled={processingRoom} className='inline'>
                Edit Room Details
            </SecondaryButton>;
        }
        return null;
    }
    const showDeleteButton = () => {
        if(isModerator){
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
               <p>Room Moderator: {moderator}  </p>
               {showEditButton()}
                {showDeleteButton()}


                <img className="w-48" src={route('rooms.banner-path',[room.banner])} alt={room.name + ' banner'} />

                <h2> {posts.length > 0 ? 'Posts' : 'No Post yet'}  </h2>
                <ul>
                    {posts.map((post) => (

                        <li key={post.id}>
                            <Link href={route('posts.show', [post.id])}>
                                <u>
                                {post.text}
                                </u>
                            </Link>

                        </li>
                    ))}
                </ul>

               { auth?.user &&  <SecondaryButton className='inline'>
                   <Link href={route('posts.create', {
                       room_id: room.id
                   })}>
                       New Post
                   </Link>
               </SecondaryButton>}
           </div>
       </Navbar>
    )

}
