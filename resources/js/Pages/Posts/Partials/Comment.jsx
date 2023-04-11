import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import {Transition} from "@headlessui/react";
import {useForm} from "@inertiajs/react";

export default function Comment( {comment, user } ) {

    const {
        delete:deleteCommentMethod,
        processing:processingDeleteComment,
        recentlySuccessful:recentlySuccessfulDeleteComment,
        errors:deleteCommentsErrors
    } = useForm();

    const deleteComment  = (e,commentId) =>{
        e.preventDefault();
        deleteCommentMethod(route('comments.destroy', [commentId]),{
            preserveState: true,
        });
    }

    const canDeleteComment = (comment) => {
        if(comment?.member_id === user?.userable_id ||
            user.userable_type === 'App\\Models\\Admin' ||
            user.userable_type === 'App\\Models\\Moderator'){
            //TODO:  notify user if admin or moderator deleted their comment
            return (
                <>
                    <SecondaryButton onClick={(e) => deleteComment(e, comment?.id)}
                                     disabled={processingDeleteComment} className='inline'>
                        Delete Comment
                    </SecondaryButton>
                    <InputError message={deleteCommentsErrors?.text} className="mt-2"/>
                    <Transition
                        show={recentlySuccessfulDeleteComment}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-black">Comment Deleted.</p>
                    </Transition>
                </>

            )
        }
    }
    return (
        <>
                <p>Author: {comment?.author}</p>
                <h3>text:  {comment?.text} </h3>
                <p>Likes: {comment?.likes}</p>
                {canDeleteComment(comment)}
        </>
    )


}
