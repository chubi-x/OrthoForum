import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import Navbar from "@/Layouts/Navbar";
import {useEffect, useState} from "react";
import {handleImageChange} from "@/Utils/ImageUploadHelper";
import SecondaryButton from "@/Components/SecondaryButton";

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
            <div className='w-1/2 mx-auto px-4 mt-10'>
                <h1 className=" mx-auto flex justify-center font-bold text-xl text-gray-800 leading-tight mb-6">Create Post</h1>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <div className="">
                            <div className="mb-12">
                                <label className="mb-3 block text-base font-medium text-gray-500">
                                    Title
                                </label>
                                <div className="relative">
                                    <input type="text" placeholder="Title"
                                           name="title"
                                           id="title"
                                           value={data.title}
                                           onChange={ (e) => setData('title', e.target.value) }
                                           // required
                                           autoComplete="title"
                                           className="w-full rounded-md border border-danger py-3 pl-5 pr-12 text-black placeholder-[#929DA7] outline-none transition"/>
                                    {
                                        errors.title &&
                                        <span className="absolute top-1/2 right-4 -translate-y-1/2">
                                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                            d="M9.9987 2.50065C5.85656 2.50065 2.4987 5.85852 2.4987 10.0007C2.4987 14.1428 5.85656 17.5007 9.9987 17.5007C14.1408 17.5007 17.4987 14.1428 17.4987 10.0007C17.4987 5.85852 14.1408 2.50065 9.9987 2.50065ZM0.832031 10.0007C0.832031 4.93804 4.93609 0.833984 9.9987 0.833984C15.0613 0.833984 19.1654 4.93804 19.1654 10.0007C19.1654 15.0633 15.0613 19.1673 9.9987 19.1673C4.93609 19.1673 0.832031 15.0633 0.832031 10.0007Z"
                                            fill="#DC3545"></path>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.0013 5.83398C10.4615 5.83398 10.8346 6.20708 10.8346 6.66732V10.0007C10.8346 10.4609 10.4615 10.834 10.0013 10.834C9.54106 10.834 9.16797 10.4609 9.16797 10.0007V6.66732C9.16797 6.20708 9.54106 5.83398 10.0013 5.83398Z"
                                            fill="#DC3545"></path>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                            d="M9.16797 13.3333C9.16797 12.8731 9.54106 12.5 10.0013 12.5H10.0096C10.4699 12.5 10.843 12.8731 10.843 13.3333C10.843 13.7936 10.4699 14.1667 10.0096 14.1667H10.0013C9.54106 14.1667 9.16797 13.7936 9.16797 13.3333Z"
                                            fill="#DC3545"></path>
                                   </svg>
                                </span>
                                    }

                                </div>
                                <InputError className="mt-2" message={errors.title} />
                            </div>
                        </div>

                        <InputLabel className="!text-gray-500 mb-3" htmlFor="body" value="Body" />
                        <Textarea
                            id="body"
                            className=" focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition"
                            value={data.body}
                            onChange={ (e) => setData('body', e.target.value) }
                            // required
                            placeholder="Body"
                            isFocused
                            autoComplete="body"
                        />
                        <InputError className="mt-2" message={errors.body} />

                    </div>

                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <SecondaryButton className="w-full py-4 justify-center" type="submit" disabled={processing}>Post</SecondaryButton>
                    </div>
                    <PrimaryButton type="button" onClick={ (e)=> showImages(e) } disabled={processing}>
                        Add Image
                    </PrimaryButton>
                    <div className="inline-flex mt-3 gap-5">
                    {
                        countImages.map( (image, index) => (
                                <div className="w-full inline " key={index}>
                                    <div className="mb-12">
                                        <input
                                            type="file" name={`post-image-${index}`}
                                            onChange={ (e)=> handleImageChange(e,data, setData) }
                                            className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary file:border-form-stroke file:text-body-color file:hover:bg-primary w-full cursor-pointer rounded-lg border-[1.5px] font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-[#F5F7FD] file:py-3 file:px-5 file:hover:bg-opacity-10 disabled:cursor-default disabled:bg-[#F5F7FD]"
                                        />
                                        <InputError message={errors[`images.${[index]}`]}  className="mt-2" />
                                    </div>
                                </div>

                        ))

                    }
                    </div>
                </form>
            </div>
        </Navbar>
    );
}
