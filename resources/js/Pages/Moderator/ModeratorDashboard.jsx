import Navbar from "@/Layouts/Navbar";

export default function ModeratorDashboard({auth, moderator}){
    // const {get, processing} = useForm();

    return (
        <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
            <div>
                <h1>Moderator Dashboard</h1>
                <p>Posts to be moderated</p>
                </div>
        </Navbar>
    )
}
