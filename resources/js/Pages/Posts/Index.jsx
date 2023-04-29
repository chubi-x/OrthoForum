import Navbar from "@/Layouts/Navbar";
import {useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PostCard from "@/Pages/Posts/Partials/PostCard";
import {useState} from "react";
import ReactPaginate from "react-paginate";


function Posts({ currentItems}){
    return <div className=" mx-auto space-x-4 flex">
        { currentItems && currentItems.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
    </div>
}
export default function Index({ auth, posts }) {
    const [itemOffset,setItemOffset] = useState(0);
    const endOffset = itemOffset + 5; //5 items per page
    const currentItems = posts.slice(itemOffset,endOffset);
    const pageCount = Math.ceil(posts.length / 5);

    const handlePageClick = ({ selected: selectedPage }) => {
        setItemOffset((selectedPage * 5) & posts.length ) ;
    }

    const { get, processing } = useForm();
    const newPost = () => {
        get(route("posts.create"));
    };
    // TODO: show user name and avatar
    const memberId = auth.user?.userable_id;
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

                <Posts currentItems={currentItems}/>

                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={"..."}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center mt-10"}
                    breakLinkClassName={"border border-gray-300 hover:bg-blue-100 hover:text-blue-700 py-2 px-3"}
                    pageLinkClassName={" border border-gray-300 hover:bg-blue-100 hover:text-blue-700  py-2 px-3"}
                    previousLinkClassName={
                        "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3"
                    }
                    nextLinkClassName={
                        "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3"
                    }
                    disabledLinkClassName={"text-gray-300 cursor-not-allowed"}
                    activeClassName={"text-indigo-500 font-bold bg-orange-200"}
                    activeLinkClassName={"text-indigo-500 font-bold bg-orange-200"}
                />

            </div>
        </Navbar>
    );
}
