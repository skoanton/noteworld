
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Editor from '@/components/Editor';
import { useNavigate, useParams } from 'react-router';
import { deleteNote, getNoteById, saveNote } from '@/api/note';
import { Note } from '@/types/general';
import { debounce } from "lodash";
import { Button } from '@/components/ui/button';
type EditNotePageProps = {

}

export default function EditNotePage({ }: EditNotePageProps) {
    const [noteTitle, setNoteTitle] = useState<string>("New note");
    const [note, setNote] = useState<Note | null>(null);
    const params = useParams();
    const navigate = useNavigate();
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

    const handleDelete = () => {

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
            <div className="flex flex-col gap-5 w-full p-5">
                <div className='flex justify-between items-center'>

                    <Input
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.currentTarget.value)}
                        placeholder="Note header"
                        className='w-1/4'
                    />

                    <Button variant={'destructive'} onClick={() => handleDelete()}>Delete note</Button>

                </div>
                {note && (
                    <Editor note={note} />
                )}

            </div>
        </>
    )
}