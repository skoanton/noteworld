import { deleteNote } from "@/api/note";
import { Button } from "./ui/button"
import { useNavigate } from "react-router";
import { Note } from "@/types/general";

type DeletePromptProps = {
    note: Note | null
    onClose: () => void
}

export default function DeletePrompt({ note, onClose }: DeletePromptProps) {

    const navigate = useNavigate();
    const handleDelete = async () => {
        const removeNote = async () => {
            if (note) {
                const response = await deleteNote(note.id);

                if (response) {
                    console.log("Note deleted");
                    navigate('/dashboard');
                }
                else {
                    console.log("Error deleting note");
                }
            }
        }
        removeNote();
    }

    return (
        <>
            <div className="flex justify-center gap-5">
                <Button onClick={() => onClose()}>No</Button>
                <Button variant={"secondary"} onClick={() => handleDelete()}>Yes</Button>
            </div>

        </>
    )
}