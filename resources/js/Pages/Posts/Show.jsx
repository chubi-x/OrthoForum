import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import {Transition} from "@headlessui/react";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useState} from "react";

export default function Show({auth, post, author, comments}) {
    const {get:getEditPost, delete:deletePostMethod , processing:processingPost} = useForm({
    });
    const {
        data:commentsData, setData:setCommentsData,
        // delete:deleteCommentMethod,
        post:postComment,
        processing:processingComment,
        recentlySuccessful:recentlySuccessfulComments,
        errors:commentsErrors
    } = useForm({
        text: '',
        post_id: post.id,
        member_id: auth.user.id,
    });
    const  [showComment,setShowComment] = useState(false);
    const deletePost = (postId) => {
        deletePostMethod(route('posts.destroy', [postId]));
    };
    const editPost = (postId) => {
        getEditPost(route('posts.edit', [postId]));
    }
    const newComment = (e) => {
        e.preventDefault()
        postComment(route('comments.store'),{
            preserveState: false,
        });
    }
    // const deleteComment  = (e,commentId) =>{
    //     e.preventDefault();
    //     deleteCommentMethod(route('comments.destroy', [commentId]));
    // }
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Post</h1>
                <p>Author: {author}</p>
                <div>
                    <h2> Text:  {post.text} </h2>
                    <p>Likes: {post.likes}</p>

                    <h3> {comments.length > 0 ? 'Comments' : 'No Comments'}  </h3>
                    {
                        comments.map((comment) => (
                            <div key={comment.id}>
                                <p>Author: {comment.author}</p>
                                <h3>text:  {comment.text} </h3>
                                <p>Likes: {comment.likes}</p>
                            </div>
                        ))
                    }
                    <SecondaryButton onClick={()=>setShowComment(!showComment)} className='inline'>
                        New Comment
                    </SecondaryButton>
                    { showComment &&
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
                        <InputError message={commentsErrors.text} className="mt-2"/>
                        <SecondaryButton type='submit' disabled={processingComment} className='inline'>
                           Post
                        </SecondaryButton>
                    </form>
                    }

                    <SecondaryButton onClick={()=>deletePost(post.id)} disabled={processingPost} className='inline'>
                        Delete Post
                    </SecondaryButton>

                    <SecondaryButton onClick={()=>editPost(post.id)} disabled={processingPost} className='inline'>
                        Edit Post
                    </SecondaryButton>
                    <Transition
                        show={recentlySuccessfulComments}
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
