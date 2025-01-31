import { getAllNotes } from "@/api/note";
import { Note } from "@/types/general";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

type NoteListProps = {}

export default function NoteList({ }: NoteListProps) {

    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {

        const fetchNotes = async () => {

            const response = await getAllNotes();
            console.log(response);
            if (response) {
                setNotes(response.notes);
            }
        }

        fetchNotes();

    }, []);



    return (
        <>

            <div>
                <h2 className="text-2xl font-bold">Notes</h2>
                <div className="grid grid-cols-5 gap-5 mt-5">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            </div>

        </>
    )
}