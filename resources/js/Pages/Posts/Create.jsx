import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useEffect} from "react";

export default function Create() {
    const user = usePage().props.auth.user;
    const { data, setData, post, errors, processing } = useForm({
        text: '',
        userable_id: ''
    });

    useEffect(() => {
        setData('userable_id', user.userable_id);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };
    return (
        <AuthenticatedLayout user={user}>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="post" value="Post" />

                        <Textarea
                            id="post"
                            className="mt-1 block w-full"
                            value={data.text}
                            onChange={(e) => setData('text', e.target.value)}
                            required
                            isFocused
                            autoComplete="text"
                        />

                        <InputError className="mt-2" message={errors.text} />
                    </div>


                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Post</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
