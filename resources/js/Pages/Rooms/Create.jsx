import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import Navbar from "@/Layouts/Navbar";

export default function Create({auth}) {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        banner: '',
        description: '',
        type: 'PUBLIC',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('rooms.store'));
    }
    return (
        <Navbar user={auth.user} moderatorId={ auth.moderatorId}>
            <div>
                <h1>Create Room</h1>
                <form onSubmit={ (e)=> submit(e) }>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput name="name" label="Name" required={true} value={data.name} onChange={ (e)=> setData('name', e.target.value) } />
                    <InputError message={errors.name} className="mt-2" />
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput name="description" label="Description" required={true} value={data.description} onChange={ (e)=> setData('description', e.target.value) } />
                    <InputError message={errors.description} className="mt-2" />
                    <select name="type" onChange={ (e)=> setData('type', e.target.value) } required={true}>
                        <option value="PUBLIC">PUBLIC</option>
                        <option value="PRIVATE">PRIVATE</option>
                    </select>
                    <input type="file" required onChange={ (e)=> setData('banner', e.target.files[0]) } />
                    <InputError message={errors.banner} className="mt-2" />
                    <SecondaryButton type="submit" disabled={processing}>Create Room</SecondaryButton>
                </form>
            </div>
        </Navbar>
    )
}
