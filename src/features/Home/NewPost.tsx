import { useState } from "react";
import { useCreatePostMutation } from "../../api/queries/postsQuery";

type NewPostProps = {
    onClose: () => void;
}

const NewPost = ({ onClose }: NewPostProps) => {

    const createMutation = useCreatePostMutation()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)

    function createPost() {
        const newPost = {
            name: name,
            description: description,
            image: image ? image.name : ''
        }

        createMutation.mutate(newPost)
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
                        <input placeholder="Post name..." value={name} onChange={(e) => (setName(e.target.value))} className="border border-black p-2"></input>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                        <p>Description:</p>
                        <input placeholder="Post description..." className="border border-black p-2" value={description} onChange={(e) => (setDescription(e.target.value))}></input>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                        <p>Image:</p>
                        <input type="file" className="border border-black p-2" onChange={(e) => {
                            const file = e.target.files?.[0] ?? null
                            setImage(file)
                        }} ></input>
                    </div>
                    <button className="border border-black p-2" onClick={createPost}>Create Post</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost