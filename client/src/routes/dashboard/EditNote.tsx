
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Editor from '@/components/Editor';
import { useParams } from 'react-router';
import { getNoteById, saveNote } from '@/api/note';
import { Note } from '@/types/general';
import { debounce } from "lodash";
type EditNotePageProps = {

}

export default function EditNotePage({ }: EditNotePageProps) {
    const [noteTitle, setNoteTitle] = useState<string>("New note");
    const [note, setNote] = useState<Note | null>(null);
    const params = useParams();

    const noteId = params.id;

    useEffect(() => {
        const fetchNote = async () => {
            if (noteId) {
                try {
                    const response = await getNoteById(noteId);
                    if (response.note) {
                        setNoteTitle(response.note.title);
                        setNote(response.note);
                    }
                } catch (error) {
                    console.error("Error fetching note:", error);
                }
            }
        };

        fetchNote();
    }, [noteId]);


    useEffect(() => {

        const saveThisTitle = async () => {
            if (note) {
                const updatedNote = { title: noteTitle };
                const response = await saveNote(note.id, updatedNote);
                if (response?.note) {
                    setNoteTitle(response.note.title);
                }
            }
        }


        const debouncedSave = debounce(saveThisTitle, 500);

        debouncedSave();

        return () => {
            debouncedSave.cancel();
        };

    }, [noteTitle]);



    return (
        <>
            <div className="flex flex-col gap-5 w-full p-5">
                <Input
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.currentTarget.value)}
                    placeholder="Note header"
                    width={96}
                />
                {note && (
                    <Editor note={note} />
                )}

            </div>
        </>
    )
}