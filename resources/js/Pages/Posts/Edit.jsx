import Navbar from "@/Layouts/Navbar";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import {useState} from "react";
import Textarea from "@/Components/Textarea";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Edit({auth, post}){
     const {data, setData, post:postEdit, processing, errors} = useForm({
            title: post.title,
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

    return (
        <Navbar user={auth?.user} moderatorId={auth?.moderatorId}>
            <div className='w-1/2 mx-auto px-4 mt-10'>
                <h1 className=" mx-auto mt-10 flex justify-center font-bold text-xl text-gray-800 leading-tight mb-6">Edit Post</h1>

                <form onSubmit={(e)=>submit(e)}>

                    <div>
                        <div className="">
                            <div className="mb-12">
                                <label className="mb-3 block text-base font-medium text-black">
                                    Title
                                </label>
                                <div className="relative">
                                    <input type="text" placeholder="Title"
                                           name="title"
                                           id="title"
                                           value={data.title}
                                           onChange={ (e) => setData('title', e.target.value) }
                                           required
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
                                {errors.title &&  <p className="mt-[10px] text-sm text-danger">{errors.title}</p> }
                            </div>
                        </div>

                        <InputLabel htmlFor="body" value="Body" />
                        <Textarea
                            id="body"
                            className=" focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition"
                            value={data.body}
                            onChange={ (e) => setData('body', e.target.value) }
                            required
                            isFocused
                            autoComplete="body"
                        />
                        <InputError className="mt-2" message={errors.body} />

                    </div>

                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <SecondaryButton className="w-full py-4 justify-center" type="submit" disabled={processing}>Edit</SecondaryButton>
                    </div>


                </form>
            </div>
        </Navbar>
    )
}
