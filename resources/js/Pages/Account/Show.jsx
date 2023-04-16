import Navbar from "@/Layouts/Navbar";
import PostCard from "@/Pages/Posts/Partials/PostCard";
import {Link} from "@inertiajs/react";

export default function Show({auth,posts,comments}){
    console.log(posts)
    return (
        <Navbar user={auth.user} moderatorId={auth.moderatorId}>
            <div className="py-12 px-32">
                <div className="overflow-hidden flex relative h-40 bg-black font-bold text-3xl text-center  rounded-md">
                    <img className=" w-full h-full object-cover opacity-40" alt="banner photo" src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"/>
                    <p className="absolute top-14 text-center text-white w-full ">
                        {auth.user.username + "'s Content"}
                    </p>
                </div>
                <div className="text-2xl font-semibold mt-10">
                    {posts.length> 0 ? "Posts" : "No Posts"}
                    <div className="flex gap-6 mt-4">
                        {posts.map((post) => (
                            <PostCard post={post} key={post.id}/>
                        ))}
                    </div>
                </div>
                <div className="mt-10">
                    <h1 className="text-2xl font-semibold ">
                        {comments.length> 0 ? "Comments" : "No Comments"}
                    </h1>
                    <div className="flex gap-6 mt-4">
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <h1 className="flex gap-4 hover:underline">
                                    <Link href={route("posts.show",{id:comment.post_id})}>
                                        {comment.text}
                                    </Link>
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Navbar>
    )
}
