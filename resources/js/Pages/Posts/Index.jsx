import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({auth,posts}){
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Posts</h1>
                {posts.length === 0 ? <p>You have no posts.</p> : <p>Here are all of your posts.</p> }
                {
                    posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.text}</h2>
                    </div>
                    ))
                }
            </div>
        </AuthenticatedLayout>

    )
}
