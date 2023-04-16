import Navbar from "@/Layouts/Navbar";
import {useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PostCard from "@/Pages/Posts/Partials/PostCard";

export default function Index({ auth, posts }) {
    const { get, processing } = useForm();
    const newPost = () => {
        get(route("posts.create"));
    };
    // TODO: show user name and avatar
    const memberId = auth.user.userable_id;
    const urlMemberId = parseInt(
        location.pathname[location.pathname.length - 1]
    );
    const headerMessage = memberId === urlMemberId ? "Your Posts" : "Posts";
    const noPostsMessage =
        memberId === urlMemberId
            ? "You have no posts."
            : "This member has no posts.";
    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10 p-10">
                <div className="flex items-center justify-between mb-10">
                    {posts.length === 0 ? (
                        <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                            {" "}
                            {noPostsMessage}{" "}
                        </h1>
                    ) : (
                        <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                            {" "}
                            {headerMessage}{" "}
                        </h1>
                    )}
                    {memberId === urlMemberId && (
                        <SecondaryButton
                            onClick={newPost}
                            disabled={processing}
                            className="inline"
                        >
                            New Post
                        </SecondaryButton>
                    )}
                </div>

                <div className=" mx-auto space-x-4 flex">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </Navbar>
    );
}
