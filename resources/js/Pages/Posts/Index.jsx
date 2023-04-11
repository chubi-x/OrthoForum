import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Link, useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({auth,posts}){
    const {get, processing} = useForm();
    const newPost = () => {
        get(route('posts.create'));
    }
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Posts</h1>
                <SecondaryButton onClick={newPost} disabled={processing} className='inline'>
                    New Post
                </SecondaryButton>
                {posts.length === 0 ? <p>You have no posts.</p> : <p>Here are all of your posts.</p> }
                {
                    posts.map((post) => (
                    <div key={post.id}>
                        <h2>
                            <Link href={route('posts.show',[post.id])}>
                                <u>
                                    {post.text}
                                </u>
                            </Link>
                        </h2>
                        {
                            post.images.map((image,index) => (
                                <img key={image.id} loading="lazy" src={route("posts.image-path",[image.path])} alt={post.id + 'image '+ index} />
                            ))
                        }


                    </div>
                    ))
                }
            </div>
        </AuthenticatedLayout>

    )
}
