import Navbar from "@/Layouts/Navbar";
import Comment from "@/Pages/Posts/Partials/Comment";
import SecondaryButton from "@/Components/SecondaryButton";
import {Transition} from "@headlessui/react";
import {Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useState} from "react";
import ReactTimeAgo from "react-time-ago";
import emptyHeart from "../../../images/empty-heart.svg";
import filledHeart from "../../../images/filled-heart.svg";
import DangerButton from "@/Components/DangerButton";

export default function Show({auth, post, author, comments, images, canEditPost, canDeletePost}) {
    const  [showComment,setShowComment] = useState(false);
    const [likePost, setLikePost] = useState(false);
    const postIsLikedByUser = post?.likes?.find((like) => like.member_id === auth?.user?.id);
    const {post:postMethod, delete:deleteMethod , processing:processingPost} = useForm({
    });
    const {
        data:commentsData, setData:setCommentsData,
        post:postComment,
        processing:processingPostComment,
        recentlySuccessful:recentlySuccessfulPostComment,
        errors:postCommentsErrors
    } = useForm({
        text: '',
        post_id: post?.id,
        member_id: auth?.user?.id,
    });

    const deletePost = (postId) => {
        deleteMethod(route('posts.destroy', [postId]),{
            preserveScroll: true,
        });
    };
    const toggleLikePost = (postId) => {
        if(auth.user){
          likePost ?  setLikePost(false) : setLikePost(true);
            // if post is liked, send post request to unlike post
            // if post is not liked, send post request to like post
            likePost || postIsLikedByUser ? postMethod( route ('posts.unlike', [postId]) ) :
                postMethod( route('posts.like', [postId]),{
                    preserveScroll: true,
                } );
        }
        else  alert("You need to be logged in to like a post");

    }
    const postNewComment = (e) => {
        e.preventDefault();
        postComment( route('comments.store'),  {
            preserveScroll: true,
        } );
    }
    const showCommentForm = () => {
        auth.user ? setShowComment(!showComment) : alert("You need to be logged in to comment");
    }

    const showEditButton = () =>{
        if(canEditPost) {
           return (
                <>
                    <SecondaryButton
                                     disabled={processingPost} className='inline'>
                        <Link href={route('posts.edit', [post.id])}>
                            Edit Post
                        </Link>

                    </SecondaryButton>
                </>
            )
        }
    }

    const showDeleteButton = () => {
        if (canDeletePost) {

            // TODO: notify user if admin or moderator deleted post
            return (
                <DangerButton onClick={() => deletePost(post.id)}
                                 disabled={processingPost} className='inline'>
                    Delete Post
                </DangerButton>
            )
        }
    }
    const canPostComment = (bool) => {
       return <>
           {bool &&
               <form onSubmit={(e) => postNewComment(e)}>
                   <InputLabel htmlFor="comment-text" className="dark:text-gray-700 mt-6" value="New Comment"/>
                   <TextInput
                       id="comment-text"
                       name="text"
                       value={commentsData?.text}
                       className="mt-1 block bg-white w-9/12 h-20 dark:bg-gray-100 dark:text-black dark:border-gray-500"
                       autoComplete="text"
                       isFocused={true}
                       onChange={(e) => setCommentsData('text', e.target.value)}
                       required
                   />
                   <InputError message={postCommentsErrors?.text} className="mt-2"/>
                   <SecondaryButton type='submit' disabled={processingPostComment} className='inline mt-4'>
                       Post Comment
                   </SecondaryButton>
               </form>}
       </>

    }

    return (
        <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
            <div className="pt-10 flex flex-col px-24 md:px-48 bg-white">
                <div className="flex gap-4 justify-end">
                    {showEditButton()}
                    {showDeleteButton()}
                </div>

                <div className="my-10">
                    <div className="flex flex-col mb-4">
                        <h2 className="font-bold text-3xl text-center">{post?.title} </h2>
                        <div className="self-end space-y-2 flex flex-col items-end w-1/2">
                            <p className="text-gray-500 w-1/2 text-end text-xs">
                                By:
                                <Link className="hover:underline" href={route("account.show",{id:post.member_id})}>
                                   {" "+ author }
                                </Link>
                            </p>
                            { post?.room_id && <p className="text-gray-500 w-1/2 text-end text-xs">
                                Posted in:
                                <Link className="hover:underline" href={route("rooms.show", {id: post?.room_id})}>
                                    {" " + post?.room?.name}
                                </Link>

                            </p>}
                            <p className="text-gray-500 w-1/2 text-end text-xs">Created: { <ReactTimeAgo date={new Date(post?.created_at)} locale="en-US"/>  }</p>
                            <p className="text-gray-500 w-1/2 text-end text-xs">Updated: { <ReactTimeAgo date={ new Date(post?.updated_at)} locale="en-US"/>  }</p>
                        </div>
                    </div>

                    {
                        post.image &&
                        <img className="w-full" loading="lazy" src={route("posts.image-path",[post.image?.path])} alt={post?.title + 'image '} />
                    }
                    <article className="my-10" >
                        {post?.body}
                    </article>

                    <button className="flex ml-auto"  onClick={()=> toggleLikePost(post.id)}>
                        <img className="w-6" src={ likePost || postIsLikedByUser ? filledHeart : emptyHeart } alt="like" />
                    </button>
                    <p className="text-gray-500 mt-2 text-end text-xs" >{post?.likes.length} {post?.likes.length ===1 ? 'Like' : 'Likes'} </p>


                    <div className="justify-between flex mt-10 items-center">
                        <h3 className="text-2xl font-bold"> {comments?.length > 0 ? 'Comments' : 'No Comments'}  </h3>
                        <SecondaryButton onClick={showCommentForm}>
                            New Comment
                        </SecondaryButton>
                    </div>
                    {
                        comments?.map((comment) => (
                            <Comment key={comment?.id} comment={comment} canDeletePost = {canDeletePost} auth={auth}/>
                        ))
                    }

                    {canPostComment(showComment)}
                    <Transition
                        show={recentlySuccessfulPostComment}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-black">Comment posted.</p>
                    </Transition>
                </div>
            </div>
        </Navbar>
    )
}
