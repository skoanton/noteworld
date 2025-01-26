import { useNavigate } from "react-router"
import { Button } from "./ui/button"

type HeaderProps = {}

export default function Header({ }: HeaderProps) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/");
    }

    const handleNewNote = () => {
        navigate("/dashboard/new-note")
    }

    return (

        <>
            <div className=" flex gap-5 p-4 items-center w-full bg-slate-500" >
                <h1>Note world</h1>
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