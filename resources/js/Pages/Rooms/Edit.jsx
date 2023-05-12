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
           <div className="w-1/2 mx-auto px-4 mt-10">
               <h1 className="mx-auto mt-10 flex justify-center font-bold text-xl text-gray-800 leading-tight mb-6">Edit Room</h1>

               <form onSubmit={(e)=>submit(e)}>

                   <label className="mb-3 block text-base font-medium text-black">
                       Name
                   </label>
                   <TextInput
                       id="name"
                       name="name"
                       value={data.name}
                       className="w-full rounded-md border border-danger py-3 pl-5 pr-12 text-black placeholder-[#929DA7] outline-none transition"
                    autoComplete="text"
                       isFocused={true}
                       onChange={(e) => setData('name', e.target.value)}
                   />
                   <InputError message={errors.name} className="mt-2" />

                   <InputLabel htmlFor="description" value="Description" />
                   <Textarea
                       id="description"
                       className=" focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition"
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
