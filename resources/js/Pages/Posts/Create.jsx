import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import Navbar from "@/Layouts/Navbar";
import {useEffect, useState} from "react";
import {handleImageChange} from "@/Utils/ImageUploadHelper";
import TextInput from "@/Components/TextInput";

export default function Create({auth}) {
    const user = auth?.user;
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        images: [],
        body: '',
        userable_id: '',
        room_id: new URLSearchParams(location.search).get('room_id'),
    });
    const [countImages, setCountImages] = useState([]);

    useEffect(() => {
        setData('userable_id', user.userable_id);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };
    const showImages = () => {
        countImages.length <4 ? setCountImages(prev=>( [...prev, 0 ] ) ) : alert("You can't add more than 4 images");
    }
    return (
        <Navbar user={user} moderatorId={auth?.moderatorId}>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <PrimaryButton type="button" onClick={ (e)=> showImages(e) } disabled={processing}>
                            Add Image
                        </PrimaryButton>
                        {
                            countImages.map( (image, index) => (
                                   <>
                                       <input key={index} type="file" name={`post-image-${index}`} onChange={ (e)=> handleImageChange(e,data, setData) } />
                                       <InputError className="mt-2" message={errors[`images.${[index]}`]} />

                                   </>

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
                        <InputError className="mt-2" message={errors.title} />
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
                        <InputError className="mt-2" message={errors.body} />

                    </div>


                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Post</PrimaryButton>
                    </div>
                </form>
            </div>
        </Navbar>
    );
}
