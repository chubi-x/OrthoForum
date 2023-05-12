import {Link} from "@inertiajs/react";

export default function PostCard({ post,author }) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const year = new Date(post.created_at).getFullYear();
    const day = new Date(post.created_at).getDate();
    const month = new Date(post.created_at).getMonth();

    const postImage =
        post.image && post.image.path
            ? route("posts.image-path", [post.image.path])
            : "https://via.placeholder.com/150";
    return (
        <article className="flex bg-blue-100 transition hover:shadow-xl w-1/4 grow">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                    dateTime="2022-10-10"
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span> {year} </span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>
                        {months[month]} {day}
                    </span>
                </time>
            </div>

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt="The featured image of a post"
                    src={postImage}
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <h3 className="font-bold uppercase text-gray-900">
                            {post.title}

                            { author && <p className="lowercase text-sm mt-4 text-orange-800">
                                By: <Link className="hover:underline" href={route("account.show",[author.id])}>  {author.username}  </Link>
                            </p>}
                        </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                        {post.body}
                    </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <a
                        href={route("posts.show", [post.id])}
                        className="block bg-gray-800 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-gray-700"
                    >
                        Go to Post
                    </a>
                </div>
            </div>
        </article>
    );
}
