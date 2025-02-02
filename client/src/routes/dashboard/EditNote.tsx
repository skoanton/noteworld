
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Editor from '@/components/Editor';
import { useParams } from 'react-router';
import { getNoteById, saveNote } from '@/api/note';
import { Note } from '@/types/general';
import { debounce } from "lodash";
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';
import DeletePrompt from '@/components/DeletePrompt';
type EditNotePageProps = {

}

export default function EditNotePage({ }: EditNotePageProps) {
    const [noteTitle, setNoteTitle] = useState<string>("New note");
    const [note, setNote] = useState<Note | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

    const handleDelete = () => {
        setIsModalOpen(true);
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
                    <Button variant="destructive" onClick={() => handleDelete()}>
                        Delete Note
                    </Button>
                    <Modal title="Delete note" description="Are you sure you want to delete this note?" triggerButton={false} isOpen={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
                        <DeletePrompt note={note} onClose={() => setIsModalOpen(false)} />
                    </Modal>

                </div>
                {note && (
                    <Editor note={note} />
                )}

            </div >
        </>
    )
}