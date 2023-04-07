import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({auth,post,author,comments}) {
    console.log(author)
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
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
