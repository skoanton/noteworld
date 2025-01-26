import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import { createNote } from "@/api/note"

type HeaderProps = {}

export default function Header({ }: HeaderProps) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/");
    }

    const handleNewNote = async () => {

        try {
            const newNote = {
                title: "New note",
                content: ""
            }
            const response = await createNote(newNote)
            const noteId = response.note.id

            navigate(`/dashboard/note/${noteId}/edit`);

        } catch (error) {
            console.error("Failed to create a new note:", error);
        }

    }

    const handleClick = () => {
        navigate("/dashboard");
    }

    return (

        <>
            <div className=" flex gap-5 p-4 items-center w-full bg-slate-700" >
                <h1 onClick={() => handleClick()} className="text-4xl font-bold text-white hover:cursor-pointer">Note world</h1>
                <div className="ml-auto">
                    <div className="flex gap-5">
                        <Button onClick={() => navigate("/dashboard/admin")}>Admin</Button>
                        <Button onClick={() => handleLogout()}>Logout</Button>
                        <Button onClick={() => handleNewNote()} >New note</Button>
                    </div>
                </div>
            </div>
        </>
    )
}