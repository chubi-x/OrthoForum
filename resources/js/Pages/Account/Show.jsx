import Navbar from "@/Layouts/Navbar";
import PostCard from "@/Pages/Posts/Partials/PostCard";
import {Link, useForm} from "@inertiajs/react";
import {useState} from "react";
import ReactPaginate from "react-paginate";
import DangerButton from "@/Components/DangerButton";

function Posts({currentItems}){
    return <div className="flex flex-wrap gap-6 mt-4">
        {currentItems && currentItems.map((post) => (
            <PostCard post={post} key={post.id}/>
        ))}
    </div>
}
export default function Show({auth, user, posts,comments, isAdmin}){
    const {delete:deleteMethod} = useForm();
    const [itemOffset,setItemOffset] = useState(0);
    const endOffset = itemOffset + 5; //5 items per page
    const currentItems = posts.slice(itemOffset,endOffset);
    const pageCount = Math.ceil(posts.length / 5);
    const handlePageClick = ({ selected: selectedPage }) => {
        setItemOffset((selectedPage * 5) % posts.length ) ;
    }
    const deleteUser = () => {
        deleteMethod(route("account.destroy", [user.id]));
    }
    return (
        <Navbar user={auth.user} moderatorId={auth.moderatorId}>
            <div className="py-12 px-32">
                <div className="overflow-hidden flex relative h-40 bg-black font-bold text-3xl text-center  rounded-md">
                    <img className=" w-full h-full object-cover opacity-40" alt="banner photo" src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"/>
                    <p className="absolute top-14 text-center text-white w-full ">
                        {user.username + "'s Content"}
                    </p>
                    {isAdmin &&   <DangerButton className="absolute top-14 right-14" onClick={()=>{if(confirm("Are you sure you want to delete this user?")){deleteUser()}}}>Delete User</DangerButton>}
                </div>
                <div className="text-2xl font-semibold mt-10">
                    {posts.length> 0 ? "Posts" : "No Posts"}
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
                <div className="mt-10">
                    <h1 className="text-2xl font-semibold ">
                        {comments.length> 0 ? "Comments" : "No Comments"}
                    </h1>
                    <div className="flex flex-wrap gap-6 mt-4">
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <h1 className="flex gap-4 w-20 overflow-hidden text-ellipsis hover:underline">
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
