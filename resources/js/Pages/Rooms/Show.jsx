import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link, useForm} from "@inertiajs/react";
import PostCard from "@/Pages/Posts/Partials/PostCard";

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
            Join
        </SecondaryButton>
    }
}
const showLeaveButton = () => {
    if(!isModerator && isMember  ){
        return <SecondaryButton onClick={() => leaveRoom(room.id)}
                    disabled={processingRoom} className='inline'>
            Leave
        </SecondaryButton>
    }
}

    return (
       <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
           <div>
               <header className="w-full h-80 bg-black relative flex overflow-hidden ">
                   <img className="object-cover opacity-40 h-full w-full"  src={route('rooms.banner-path',[room.banner])} alt="Room Banner"/>
                       <section className='flex flex-col absolute top-20 w-full text-center '>
                           <h1 className="text-4xl font-bold text-white">{room.name}</h1>
                           <h2 className=" mt-10 text-lg font-semibold text-white">{room.description}</h2>

                           <h2 className=" mt-20 ml-10 text-md self-start text-white">
                               Moderator: {moderator}
                           </h2>
                       </section>
                     <div className="flex flex-col absolute top-2 right-10">
                         {showEditButton()}
                         {showDeleteButton()}
                         {showJoinButton()}
                         {showLeaveButton()}
                     </div>
               </header>

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

                <h2> {posts.length > 0 ? 'Posts' : 'No Post yet'}  </h2>
                <ul>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/>
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
