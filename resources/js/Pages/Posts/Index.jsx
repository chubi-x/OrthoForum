import Navbar from "@/Layouts/Navbar";
import {Link, useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({auth,posts}){
    const {get, processing} = useForm();
    const newPost = () => {
        get(route('posts.create'));
    }
    // TODO: show user name and avatar
    const memberId = auth.user.userable_id;
    const urlMemberId = parseInt(location.pathname[location.pathname.length-1]);
    const headerMessage = memberId === urlMemberId ? 'Your Posts' : 'Posts';
    const noPostsMessage = memberId === urlMemberId ? 'You have no posts.' : 'This member has no posts.';
    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div>
                <h1>Posts</h1>
                {
                    memberId === urlMemberId &&
                    <SecondaryButton onClick={newPost} disabled={processing} className='inline'>
                    New Post
                </SecondaryButton>
                }
                {posts.length === 0 ? <p> {noPostsMessage} </p> : <p> {headerMessage} </p> }
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
        </Navbar>

    )
}
