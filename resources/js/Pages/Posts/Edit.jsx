import Navbar from "@/Layouts/Navbar";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import {useState} from "react";
import {handleImageChange} from "@/Utils/ImageUploadHelper";
import Textarea from "@/Components/Textarea";

export default function Edit({auth, post, images}){
     const {data, setData, post:postEdit, processing, errors} = useForm({
         images: [],
         text: post.text,
     });
    const [countImages, setCountImages] = useState([]);
     const submit = (e) => {
        e.preventDefault();
        postEdit(route('posts.update', [post.id]), {
            preserveState: true,
            onSuccess: () => {
                // redirect to show page
                route('posts.show', [post.id]);
            }
        });
     }

    const showImages = () => {
        countImages.length < 4 - images?.length ? setCountImages(prev=>( [...prev, 0 ] ) ) : alert("You can't add more than 4 images");
    }
    return (
        <Navbar user={auth.user}>
            <div>
                <h1>Edit Post</h1>

                <form onSubmit={(e)=>submit(e)}>

                    <PrimaryButton type="button" onClick={ (e)=> showImages(e) } disabled={processing}>
                        Add Image
                    </PrimaryButton>
                    {
                        countImages.map( (_, index) => (
                            <input key={index} type="file" name={`post-image-${index}`} onChange={ (e)=> handleImageChange(e, data, setData) } />
                        ))
                    }
                    <InputLabel htmlFor="text" value="Edit Post" />

                    <Textarea
                        id="text"
                        className="mt-1 block w-full"
                        value={data.text}
                        onChange={ (e) => setData('text', e.target.value) }
                        required
                        isFocused
                        autoComplete="text"
                    />
                    <InputError message={errors.text} className="mt-2" />

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Edit Post
                    </PrimaryButton>
                </form>
            </div>
        </Navbar>
    )
}
