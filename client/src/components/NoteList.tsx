import { getAllNotes } from "@/api/note";
import { Note } from "@/types/general";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type NoteListProps = {}

export default function NoteList({ }: NoteListProps) {

    const [notes, setNotes] = useState<Note[]>([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchNotes = async () => {

            const response = await getAllNotes();
            if (response) {
                setNotes(response.notes);
            }
        }

        fetchNotes();

    }, []);


    const handleClick = (noteId: string) => {
        navigate(`/dashboard/note/${noteId}/edit`);
    }
    return (
        <>

            <div>
                <h2 className="text-2xl font-bold">Notes</h2>
                <div className="flex flex-col gap-1">
                    {notes.map((note) => (
                        <div key={note.id} onClick={() => handleClick(note.id)} className="hover:cursor-pointer flex flex-row justify-between p-2 border border-slate-300">
                            <h2 className="hover:text-slate-600">{note.title}</h2>
                            <p>{note.updatedAt}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}