import Navbar from "@/Layouts/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import {Link, useForm} from "@inertiajs/react";
import PostCard from "@/Pages/Posts/Partials/PostCard";
import DangerButton from "@/Components/DangerButton";

export default function Show({auth, room, canModify, moderator, posts, members}){
    const {post, delete:deleteRoomMethod, processing:processingRoom} = useForm();
    const isMember =(auth.user && members.some((member) => member.id === auth.user.userable_id) );
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
        if(canModify){
            return <SecondaryButton disabled={processingRoom} className='inline'>
                <Link href={route('rooms.edit', [room?.id])}>
                    Edit Room Details
                </Link>
            </SecondaryButton>;
        }
    }
    const showDeleteButton = () => {
        if(canModify){
           return <SecondaryButton onClick={() => deleteRoom(room.id)}
                         disabled={processingRoom} className='inline'>
                Delete Room
            </SecondaryButton>
        }
    }
const showJoinButton = () => {
    if(!canModify && !isMember ){
        return <SecondaryButton onClick={() => joinRoom(room.id)}
                    disabled={processingRoom} className='inline'>
            Join
        </SecondaryButton>
    }
}
const showLeaveButton = () => {
    if(!canModify && isMember  ){
        return <DangerButton onClick={() => leaveRoom(room.id)}
                    disabled={processingRoom} className='inline'>
            Leave
        </DangerButton>
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
                     <div className="flex justify-between gap-4 absolute top-2 right-10">
                         {showEditButton()}
                         {showDeleteButton()}
                         {showJoinButton()}

                         { (isMember || canModify ) &&  <SecondaryButton className='inline'>
                             <Link href={route('posts.create', {
                                 room_id: room.id
                             })}>
                                 New Post
                             </Link>
                         </SecondaryButton>}

                         {showLeaveButton()}

                     </div>
               </header>

               <div className="px-10">
                   <div className="text-2xl font-semibold mt-10">
                       {members?.length > 0 ? 'Members' : 'No Members yet'}
                       <div className="flex gap-6 mt-4">
                           {members?.map((member) => (
                               <li key={member?.id}>
                                   <Link href={route('account.show', { id: member?.user?.id})}>
                                       <u>
                                           {member?.user?.username}
                                       </u>
                                   </Link>
                               </li>
                           ))}
                       </div>
                   </div>

                   <div className="text-2xl font-semibold mt-10">
                       {posts.length> 0 ? "Posts" : "No Posts"}
                       <div className="flex gap-4 mt-4 flex-wrap">
                           {posts.map((post) => (
                               <PostCard post={post} key={post?.id} author = {post?.member?.user}/>
                           ))}
                       </div>
                   </div>
               </div>

           </div>
       </Navbar>
    )

}
