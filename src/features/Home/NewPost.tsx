import { useState } from "react";
import { useCreatePostMutation } from "../../api/queries/postsQuery";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

type NewPostProps = {
    onClose: () => void;
}

const NewPost = ({ onClose }: NewPostProps) => {

    const username = useAppSelector(store => store.user.username)
    const createMutation = useCreatePostMutation()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const navigator = useNavigate()

    const isFormValid = name.trim().length > 0 && description.trim().length > 0 && file !== null


    function createPost() {

        if (!username) {
            navigator('/login')
            return
        }

        if (!file) {
            alert('please select an image before creating post')
            return
        }

        const newPost = {
            name: name,
            description: description,
            imageFile: file,
            created_by: username,
        }


        createMutation.mutate(newPost)
        navigator('/posts')
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex w-[500px] h-[600px] border border-black bg-white flex-col relative">
                <button className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
                    &times;
                </button>
                <h2 className="p-6 text-[25px] font-semibold">Create a new post</h2>
                <div className="flex flex-col items-center border gap-2 border-red-100 w-full px-5">
                    <div className="flex flex-row items-center justify-between w-full">
                        <p>Name:</p>
                        <input placeholder="Post name..." value={name} required onChange={(e) => (setName(e.target.value))} className="border border-black p-2"></input>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                        <p>Description:</p>
                        <input placeholder="Post description..." required className="border border-black p-2" value={description} onChange={(e) => (setDescription(e.target.value))}></input>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                        <p>Image:</p>
                        <input type="file" required className="border border-black p-2" onChange={(e) => {
                            const file = e.target.files?.[0] ?? null
                            setFile(file)
                        }} ></input>
                    </div>
                    <button className="border border-black p-2 disabled:bg-gray-500" disabled={!isFormValid} onClick={createPost}>Create Post</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost