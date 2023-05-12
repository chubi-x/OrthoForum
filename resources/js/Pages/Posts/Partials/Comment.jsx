import {Link, useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";

export default function Comment( {comment, auth, canDeletePost} ) {

    const {
        delete:deleteCommentMethod,
        processing:processingDeleteComment,
    } = useForm();

    const deleteComment  = (e,commentId) =>{
        e.preventDefault();
        deleteCommentMethod(route('comments.destroy', [commentId]),{
            preserveState: true,
            preserveScroll: true,
        });
    }
    const canDelete = auth?.user?.id === comment?.member_id ;

    const canDeleteComment = (comment) => {
        if(canDelete || canDeletePost){
            //TODO:  notify user if admin or moderator deleted their comment
            return (
                <>
                    <DangerButton onClick={(e) => deleteComment(e, comment?.id)}
                                     disabled={processingDeleteComment} className='ml-auto inline py-1'>
                        Delete
                    </DangerButton>
                </>

            )
        }
    }

    const date = new Date(comment?.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <div className="flex-1 my-6 border border-2 w-9/12 flex justify-between rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <div>
                    <div className="flex items-center my-2">
                        <strong>
                            <Link className="hover:underline"  href={route("account.show",{id:comment.member_id})}>
                                {comment?.author}
                            </Link>
                        </strong>    <span className="text-xs ml-2 text-gray-400">{ ".."+  date}</span>
                        {canDeleteComment(comment)}
                    </div>

                    <p className="text-sm">
                        {comment?.text}
                    </p>
                </div>
            </div>
        </>
    )


}
