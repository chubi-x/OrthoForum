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
        deleteMethod(route('posts.destroy', [postId]));
    };
    const toggleLikePost = (postId) => {
        if(auth.user){
          likePost ?  setLikePost(false) : setLikePost(true);
            // if post is liked, send post request to unlike post
            // if post is not liked, send post request to like post
            likePost || postIsLikedByUser ? postMethod( route ('posts.unlike', [postId]) ) :
                postMethod( route('posts.like', [postId]) );
        }
        else  alert("You need to be logged in to like a post");

    }
    const postNewComment = (e) => {
        e.preventDefault();
        postComment( route('comments.store'),  {
            preserveState:false,
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
                <SecondaryButton onClick={() => deletePost(post.id)}
                                 disabled={processingPost} className='inline'>
                    Delete Post
                </SecondaryButton>
            )
        }
    }
    const canPostComment = (bool) => {
       return <>
           {bool &&
               <form onSubmit={(e) => postNewComment(e)}>
                   <InputLabel htmlFor="comment-text" value="New Comment"/>
                   <TextInput
                       id="comment-text"
                       name="text"
                       value={commentsData?.text}
                       className="mt-1 block w-full"
                       autoComplete="text"
                       isFocused={true}
                       onChange={(e) => setCommentsData('text', e.target.value)}
                       required
                   />
                   <InputError message={postCommentsErrors?.text} className="mt-2"/>
                   <SecondaryButton type='submit' disabled={processingPostComment} className='inline'>
                       Post Comment
                   </SecondaryButton>
               </form>}
       </>

    }

    return (
        <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
            <div>
                <h1>Post</h1>
                <p>Author: {author === auth?.user?.username ? "Me" : author }</p>
                <div>
                    <h2> Title:  {post?.title} </h2>
                    <h2> Body:  {post?.body} </h2>
                    <p>Likes: {post?.likes.length}</p>
                    <p>Created: { <ReactTimeAgo date={new Date(post?.created_at)} locale="en-US"/>  }</p>
                    <p>Last Updated: { <ReactTimeAgo date={ new Date(post?.updated_at)} locale="en-US"/>  }</p>
                    <p>Room: {post?.room?.name}</p>
                    <button onClick={()=> toggleLikePost(post.id)}>
                        <img className="w-6" src={ likePost || postIsLikedByUser ? filledHeart : emptyHeart } alt="like" />
                    </button>
                    {showEditButton()}
                    {showDeleteButton()}

                    {
                        images?.map((image,index) => (
                            <img key={image.id} loading="lazy" src={route("posts.image-path",[image?.path])} alt={post?.id + 'image '+ index} />
                        ))
                    }

                    <h3> {comments?.length > 0 ? 'Comments' : 'No Comments'}  </h3>
                    {
                        comments?.map((comment) => (
                            <div key={comment?.id} className='m-10 bg-blue-200'>

                            <Comment comment={comment} moderatorId={post?.room?.moderator_id} auth={auth}/>
                            </div>
                        ))
                    }
                    <SecondaryButton onClick={showCommentForm} className='inline'>
                        New Comment
                    </SecondaryButton>
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
