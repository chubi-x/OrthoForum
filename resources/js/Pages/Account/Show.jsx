import Navbar from "@/Layouts/Navbar";
import PostCard from "@/Pages/Posts/Partials/PostCard";
import Comment from "@/Pages/Posts/Partials/Comment";

export default function Show({auth,posts,comments}){
    console.log(posts)
    return (
        <Navbar user={auth.user} moderatorId={auth.moderatorId}>
            <div className="py-12 px-32">
                <div className="py-12 font-bold text-3xl text-center bg-orange-200 rounded-md">
                    {auth.user.username + "'s Content"}
                </div>
                <div className="text-2xl font-semibold mt-10">
                    {posts.length> 0 ? "Posts" : "No Posts"}
                    <div className="flex gap-6 mt-4">
                        {posts.map((post) => (
                            <PostCard post={post} key={post.id}/>
                        ))}
                    </div>
                </div>
                <div className="text-2xl font-semibold mt-10">
                    {comments.length> 0 ? "Comments" : "No Comments"}
                    <div className="flex gap-6 mt-4">
                        {comments.map((comment) => (
                            <Comment comment={comment} key={comment.id}/>
                        ))}
                    </div>
                </div>
            </div>

        </Navbar>
    )
}
