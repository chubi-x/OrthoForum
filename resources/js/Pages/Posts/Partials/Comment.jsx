import SecondaryButton from "@/Components/SecondaryButton";
import {useForm} from "@inertiajs/react";

export default function Comment( {comment, auth,moderatorId } ) {

    const {
        delete:deleteCommentMethod,
        processing:processingDeleteComment,
    } = useForm();

    const deleteComment  = (e,commentId) =>{
        e.preventDefault();
        deleteCommentMethod(route('comments.destroy', [commentId]),{
            preserveState: true,
        });
    }

    const canDeleteComment = (comment) => {
        if(comment?.member_id === auth?.user?.userable_id ||(moderatorId && auth?.moderatorId === moderatorId )){
            //TODO:  notify user if admin or moderator deleted their comment
            return (
                <>
                    <SecondaryButton onClick={(e) => deleteComment(e, comment?.id)}
                                     disabled={processingDeleteComment} className='inline'>
                        Delete Comment
                    </SecondaryButton>
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
