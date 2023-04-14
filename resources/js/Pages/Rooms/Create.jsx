import {useForm} from "@inertiajs/react";
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
            <div className="w-full mx-auto px-4 mt-10">
                <h1 className=" mx-auto flex justify-center font-bold text-xl text-gray-800 leading-tight mb-6">Create Room</h1>
                <form className="mx-auto"  onSubmit={ (e)=> submit(e) }>

                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <div className="mb-12">
                            <label className="mb-3 block text-base font-medium text-black">
                                Name
                            </label>
                            <div className="relative">
                                <input type="text" placeholder="Room Name"
                                       name="name"
                                       required={true}
                                       value={data.name}
                                       onChange={ (e)=> setData('name', e.target.value) }
                                       className="w-full rounded-md border border-danger py-3 pl-5 pr-12 text-black placeholder-[#929DA7] outline-none transition"/>
                                {
                                    errors.name &&
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
                            {errors.name &&  <p className="mt-[10px] text-sm text-danger">{errors.name}</p> }
                        </div>
                    </div>
                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <div className="mb-12">
                            <label htmlFor="" className="mb-3 block text-base font-medium text-black">
                                Description
                            </label>
                            <textarea
                                name="description"
                                required={true}
                                value={data.description}
                                onChange={ (e)=> setData('description', e.target.value) }
                                rows="5"
                                placeholder="Description"
                                className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>

                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <div className="mb-12">
                            <label htmlFor="type" className="mb-3 block text-base font-medium text-black">
                                Type
                            </label>
                            <div className="relative">
                                <select
                                    id="type"
                                    name="type"
                                    onChange={ (e)=> setData('type', e.target.value) }
                                    required={true}
                                    className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                                >
                                    <option defaultValue value="PUBLIC">PUBLIC</option>
                                    <option value="PRIVATE">PRIVATE</option>
                                </select>
                                <span
                                    className="border-body-color absolute right-4 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2"
                                >
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <div className="mb-12">
                            <label htmlFor="" className="mb-3 block text-base font-medium text-black">
                                Banner
                            </label>
                            <input
                                required onChange={ (e)=> setData('banner', e.target.files[0]) }
                                type="file"
                                className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary file:border-form-stroke file:text-body-color file:hover:bg-primary w-full cursor-pointer rounded-lg border-[1.5px] font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-[#F5F7FD] file:py-3 file:px-5 file:hover:bg-opacity-10 disabled:cursor-default disabled:bg-[#F5F7FD]"
                            />
                            <InputError message={errors.banner} className="mt-2" />
                        </div>
                    </div>
                    <div className="w-full mx-auto md:w-1/2 lg:w-1/3">
                        <SecondaryButton className="w-full py-4 justify-center" type="submit" disabled={processing}>Create Room</SecondaryButton>
                    </div>
                </form>
            </div>
        </Navbar>
    )
}
