import { useState } from "react"
import NewPost from "./NewPost"

const HomePage = () => {

    const [isOpen, setIsOpen] = useState(false)
    function handleOpen() {
        setIsOpen(!isOpen)
    }


    return (
        <div className="flex flex-col items-center gap-3">
            <h1 className="font-bold text-[40px]">Welcome to PetSnap</h1>
            <p>An app where you can post your dog or cat and get help with an AI to recognize image category(dog or cat) and get some likes.</p>
            <button className="border border-black p-3 cursor-pointer" onClick={handleOpen}>Create a post</button>
            {isOpen && <NewPost onClose={handleOpen} />}
        </div>
    )
}

export default HomePage