import Navbar from "@/Layouts/Navbar";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import {useState} from "react";
import {handleImageChange} from "@/Utils/ImageUploadHelper";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";

export default function Edit({auth, post, images}){
     const {data, setData, post:postEdit, processing, errors} = useForm({
            title: post.title,
         images: [],
         body: post.body,
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
        <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
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
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={ (e) => setData('title', e.target.value) }
                        required
                        isFocused
                        autoComplete="title"
                    />
                    <InputError message={errors.title} className="mt-2" />

                    <InputLabel htmlFor="body" value="Body" />

                    <Textarea
                        id="body"
                        className="mt-1 block w-full"
                        value={data.body}
                        onChange={ (e) => setData('body', e.target.value) }
                        required
                        isFocused
                        autoComplete="body"
                    />
                    <InputError message={errors.body} className="mt-2" />

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Edit Post
                    </PrimaryButton>
                </form>
            </div>
        </Navbar>
    )
}
