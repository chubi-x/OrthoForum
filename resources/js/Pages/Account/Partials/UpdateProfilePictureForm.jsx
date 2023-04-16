import InputLabel from "@/Components/InputLabel";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {Transition} from "@headlessui/react";

export default function UpdateProfilePictureForm({user}){
    const {path:avatarPath} = user?.avatar || {};
    const { setData, post:postAvatar,progress, recentlySuccessful, errors} = useForm({
        avatar: '',
        _method: 'post',
    });

    const submit = (e) => {
        e.preventDefault();
        postAvatar(route('account.update-avatar'), {
            preserveState: false,
        });
    }
    return(
        <div className='text-white'>
            <div className='w-20 h-20 bg-white rounded-full'>
                { user.avatar &&  <img loading="eager" src={route('avatars.path', [avatarPath])} alt="profile picture"/>}
            </div>
            <form onSubmit={(e)=>submit(e)} encType='multipart/form-data'>
                <InputLabel htmlFor={'avatar'} value={'Profile Picture'}/>
                <input type='file' name='avatar'  id='avatar' onChange={(e)=> setData('avatar', e.target.files[0])}/>
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <InputError message={errors.avatar}/>
                <Transition show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out">
                    <p>Avatar Updated</p>
                </Transition>
                <button type='submit'>Update</button>
            </form>

        </div>
    )
}
