import Navbar from "@/Layouts/Navbar";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import Textarea from "@/Components/Textarea";

export default function Edit({auth, room}){
    const {data, setData, post, processing, errors} = useForm({
        name: room.name,
        description: room.description,
        type: room.type,
        banner: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('rooms.update', [room.id]), {
            preserveState: true,
            onSuccess: () => {
                // redirect to show page
                route('rooms.show', [room.id]);
            }
        });
    }
    return (
       <Navbar user={auth.user} moderatorId={auth?.moderatorId}>
           <div>
               <h1>Edit Room</h1>

               <form onSubmit={(e)=>submit(e)}>

                   <InputLabel htmlFor="name" value="Edit Name" />
                   <TextInput
                       id="name"
                       name="name"
                       value={data.name}
                       className="mt-1 block w-full"
                       autoComplete="text"
                       isFocused={true}
                       onChange={(e) => setData('name', e.target.value)}
                   />
                   <InputError message={errors.name} className="mt-2" />

                   <InputLabel htmlFor="description" value="Edit Description" />
                   <Textarea
                       id="description"
                       className="mt-1 block w-full"
                       value={data.description}
                       onChange={ (e) => setData('description', e.target.value) }
                       required
                       isFocused
                       autoComplete="description"
                   />
                   <InputError message={errors.description} className="mt-2" />

                   <select name="type" onChange={ (e)=> setData('type', e.target.value) } >
                       <option value="PUBLIC">PUBLIC</option>
                       <option value="PRIVATE">PRIVATE</option>
                   </select>
                   <input type="file" onChange={ (e)=> setData('banner', e.target.files[0]) } />
                   <InputError message={errors.banner} className="mt-2" />


                   <PrimaryButton className="ml-4" disabled={processing}>
                       Update
                   </PrimaryButton>
               </form>
           </div>
       </Navbar>
    )
}
