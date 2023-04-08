import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import {Transition} from "@headlessui/react";
import {useForm} from "@inertiajs/react";

export default function Show({auth,post,author,comments}) {
    const {get,delete:del,processing, recentlySuccessful} = useForm({

    });
    const deletePost = (id) => {
        del(route('posts.destroy', [id]));
    };
    const editPost = (id) => {
        get(route('posts.edit', [id]));
    }
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Post</h1>
                <p>Author: {author}</p>
                <div>
                    <h2> Text:  {post.text} </h2>
                    <p>Likes: {post.likes}</p>
                    {
                        comments.map((comment) => (
                            <div key={comment.id}>
                                <h3>  {comment.text} </h3>
                                <p>Likes: {comment.likes}</p>
                            </div>
                        ))
                    }
                    <SecondaryButton onClick={()=>deletePost(post.id)} disabled={processing} className='inline'>
                        Delete Post
                    </SecondaryButton>

                    <SecondaryButton onClick={()=>editPost(post.id)} disabled={processing} className='inline'>
                        Edit Post
                    </SecondaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-black">Deleted.</p>
                    </Transition>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}
