import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Note } from "@/types/general"
import { useNavigate } from "react-router";



type NoteCardProps = {
    note: Note
}

export default function NoteCard({ note }: NoteCardProps) {

    const navigate = useNavigate();
    const handleClick = (noteId: string) => {
        navigate(`/dashboard/note/${noteId}/edit`);
    }


    return (
        <Card onClick={() => handleClick(note.id)} className="hover:cursor-pointer">
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{note.updatedAt}</CardDescription>
            </CardHeader>
        </Card>


    )
}