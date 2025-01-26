import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import { createNote } from "@/api/note"
import { useEffect, useState } from "react";
import { getRoleFromToken } from "@/helpers/helpers";

type HeaderProps = {}

export default function Header({ }: HeaderProps) {

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userRole = getRoleFromToken();
        setRole(userRole);
    }, []);



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
                        <Button onClick={() => handleNewNote()} >New note</Button>
                        {role === "ADMIN" && <Button onClick={() => navigate("/dashboard/admin")}>Admin</Button>}
                        <Button onClick={() => handleLogout()}>Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}