import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import Navbar from "@/Layouts/Navbar";
import {useEffect, useState} from "react";
import {handleImageChange} from "@/Utils/ImageUploadHelper";

export default function Create() {
    const user = usePage().props.auth.user;
    const { data, setData, post, errors, processing } = useForm({
        images: [],
        text: '',
        userable_id: ''
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

                        <InputLabel htmlFor="post" value="Post" />

                        <Textarea
                            id="post"
                            className="mt-1 block w-full"
                            value={data.text}
                            onChange={ (e) => setData('text', e.target.value) }
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
        </Navbar>
    );
}
