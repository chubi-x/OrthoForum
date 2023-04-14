export default function RoomCard({ room }) {
    return (
        <article className="group w-1/3">
            <img
                alt={room.name + " banner"}
                src={route("rooms.banner-path", [room.banner])}
                className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[20%]"
            />

            <div className="p-4">
                <a
                    href={route("rooms.show", [room.id])}
                    className="hover:underline"
                >
                    <h3 className="text-lg font-medium text-gray-900">
                        {room.name}
                    </h3>
                </a>

                <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {room.description}
                </p>
            </div>
        </article>
    );
}
