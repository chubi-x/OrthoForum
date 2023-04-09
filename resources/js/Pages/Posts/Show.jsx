import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Comment from "@/Pages/Posts/Partials/Comment";
import SecondaryButton from "@/Components/SecondaryButton";
import {Transition} from "@headlessui/react";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useState} from "react";
import ReactTimeAgo from "react-time-ago";

export default function Show({auth, post, author, comments}) {
    const  [showComment,setShowComment] = useState(false);

    const {get:getEditPost, delete:deletePostMethod , processing:processingPost} = useForm({
    });
    const {
        data:commentsData, setData:setCommentsData,
        post:postComment,
        processing:processingPostComment,
        recentlySuccessful:recentlySuccessfulPostComment,
        errors:postCommentsErrors
    } = useForm({
        text: '',
        post_id: post.id,
        member_id: auth.user.id,
    });

    const deletePost = (postId) => {
        deletePostMethod(route('posts.destroy', [postId]));
    };
    const editPost = (postId) => {
        getEditPost( route('posts.edit', [postId]) );
    }
    const newComment = (e) => {
        e.preventDefault();
        postComment( route('comments.store'),  {
            preserveState:false,
        } );
    }

    const canEditPost = () =>{
        if(post.member_id === auth.user.userable_id) {
           return (
                <>
                    <SecondaryButton onClick={() => editPost(post.id)}
                                     disabled={processingPost} className='inline'>
                        Edit Post
                    </SecondaryButton>
                </>
            )
        }
    }

    const canDeletePost = () => {
        if (
            post.member_id === auth.user.userable_id ||
            auth.user.userable_type === 'App\\Models\\Admin' ||
            auth.user.userable_type === 'App\\Models\\Moderator') {

            // TODO: notify user if admin or moderator deleted post
            return (
                <SecondaryButton onClick={() => deletePost(post.id)}
                                 disabled={processingPost} className='inline'>
                    Delete Post
                </SecondaryButton>
            )
        }
    }
    const showCommentForm = (commentType) => {
       return <>
           {commentType &&
               <form onSubmit={(e) => newComment(e)}>
                   <InputLabel htmlFor="comment-text" value="New Comment"/>
                   <TextInput
                       id="comment-text"
                       name="text"
                       value={commentsData.text}
                       className="mt-1 block w-full"
                       autoComplete="text"
                       isFocused={true}
                       onChange={(e) => setCommentsData('text', e.target.value)}
                       required
                   />
                   <InputError message={postCommentsErrors.text} className="mt-2"/>
                   <SecondaryButton type='submit' disabled={processingPostComment} className='inline'>
                       Post Comment
                   </SecondaryButton>
               </form>}
       </>

    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Post</h1>
                <p>Author: {author}</p>
                <div>
                    <h2> Text:  {post.text} </h2>
                    <p>Likes: {post.likes}</p>
                    <p>Created: { <ReactTimeAgo date={new Date(post.created_at)} locale="en-US"/>  }</p>
                    <p>Last Updated: { <ReactTimeAgo date={ new Date(post.updated_at)} locale="en-US"/>  }</p>
                    {canEditPost()}
                    {canDeletePost()}

                    <h3> {comments.length > 0 ? 'Comments' : 'No Comments'}  </h3>
                    {
                        comments.map((comment) => (
                            <div key={comment.id} className='m-10 bg-blue-200'>

                            <Comment comment={comment} user={auth.user}/>
                            </div>
                        ))
                    }
                    <SecondaryButton onClick={()=> {
                        setShowComment(prev => !prev);
                    }} className='inline'>
                        New Comment
                    </SecondaryButton>
                    {showCommentForm(showComment)}
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
        </AuthenticatedLayout>
    )
}
