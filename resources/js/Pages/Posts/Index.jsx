import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useForm} from "@inertiajs/react";
import {Transition} from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({auth,posts}){
    const {delete:deletePost,processing, recentlySuccessful} = useForm({

    });

    const deleteFunction = (id) => {
        deletePost(route('posts.destroy', [id]));
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Posts</h1>
                {posts.length === 0 ? <p>You have no posts.</p> : <p>Here are all of your posts.</p> }
                {
                    posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.text}</h2>
                        <SecondaryButton onClick={()=>deleteFunction(post.id)} disabled={processing} className='inline'>
                            Delete Post
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
                    ))
                }
            </div>
        </AuthenticatedLayout>

    )
}
