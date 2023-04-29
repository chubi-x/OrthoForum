import Navbar from "@/Layouts/Navbar";
import PrimaryButton from "@/Components/PrimaryButton";
import {Link} from "@inertiajs/react";

export default function ShowUsers({auth,users}){
    return (
        <Navbar
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Users</h2>}

        >
            <div className="p-12 flex flex-wrap gap-6">
                {users.map((user) => (
                    <div
                        className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight">
                            {user.username}
                        </h5>
                        <p className="mb-4 text-base ">
                          Posts:  {user.postCount}
                        </p>
                        <p className="mb-4 text-base ">
                          Comments:  {user.commentCount}
                        </p>
                        <PrimaryButton>
                            <Link className={'text-white'} href={route('account.show',[user.id])}>
                                See Content
                            </Link>
                        </PrimaryButton>
                    </div>
                ))}
            </div>

        </Navbar>
    )
}
