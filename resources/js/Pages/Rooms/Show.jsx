import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link, useForm} from "@inertiajs/react";

export default function Show({auth, room, isModerator, moderator, posts, members}){
    const {post, delete:deleteRoomMethod, processing:processingRoom} = useForm();
    const isMember =(auth.user && members?.find((member) => member.id === auth.user.id));
    const deleteRoom = (roomId) => {
        deleteRoomMethod(route('rooms.destroy', [roomId]));
    };
    const joinRoom = (roomId) => {
     auth.user ? post( route('rooms.join', [roomId]) ) : alert('You must be logged in to join a room') ;
    }
    const leaveRoom = (roomId) => {
        post( route('rooms.leave', [roomId]) );
    }
    const showEditButton = () => {
        if(isModerator){
            return <SecondaryButton disabled={processingRoom} className='inline'>
                <Link href={route('rooms.edit', [room?.id])}>
                    Edit Room Details
                </Link>
            </SecondaryButton>;
        }
    }
    const showDeleteButton = () => {
        if(isModerator){
           return <SecondaryButton onClick={() => deleteRoom(room.id)}
                         disabled={processingRoom} className='inline'>
                Delete Room
            </SecondaryButton>
        }
    }
const showJoinButton = () => {
    if(!isModerator && !isMember ){
        return <SecondaryButton onClick={() => joinRoom(room.id)}
                    disabled={processingRoom} className='inline'>
            Join Room
        </SecondaryButton>
    }
}
const showLeaveButton = () => {
    if(!isModerator && isMember  ){
        return <SecondaryButton onClick={() => leaveRoom(room.id)}
                    disabled={processingRoom} className='inline'>
            Leave Room
        </SecondaryButton>
    }
}

    return (
       <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
           <div>
               <h1>Room</h1>
                <p>Room name: {room.name}</p>
                <p>Room description: {room.description}</p>
                <p>Room type: {room.type}</p>
               <p>Room Moderator: {moderator}  </p>
               {showEditButton()}
                {showDeleteButton()}
                {showJoinButton()}
                {showLeaveButton()}
               <h2>{members?.length > 0 ? 'Members' : 'No Members yet'}</h2>
                <ul>
                    {members?.map((member) => (
                        <li key={member.id}>
                            {/*<Link> /!*route('users.show', [member.id]) *!/*/}
                                <u>
                                    {member.user.username}
                                </u>
                            {/*</Link>*/}
                        </li>
                    ))}
                </ul>

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

               { (isMember || isModerator ) &&  <SecondaryButton className='inline'>
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
