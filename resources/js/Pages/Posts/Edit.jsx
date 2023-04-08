import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({auth, post}){
     const {data, setData, patch, processing, errors} = useForm({
         text: post.text,
     });

     const submit = (e) => {
        e.preventDefault();
        patch(route('posts.update', [post.id]), {
            preserveState: true,
            onSuccess: () => {
                // redirect to show page
                route('posts.show', [post.id]);
            }
        });
     }
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Edit Post</h1>

                <form onSubmit={(e)=>submit(e)}>
                    <InputLabel htmlFor="text" value="Edit Post" />
                    <TextInput
                        id="text"
                        name="text"
                        value={data.text}
                        className="mt-1 block w-full"
                        autoComplete="text"
                        isFocused={true}
                        onChange={(e) => setData('text', e.target.value)}
                        required
                    />
                    <InputError message={errors.text} className="mt-2" />

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Edit Post
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
