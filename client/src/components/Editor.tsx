import { saveNote } from '@/api/note';
import { Note } from '@/types/general';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import rehypeSanitize from "rehype-sanitize";
import { debounce } from "lodash";
type EditorProps = {
    note: Note | null;
}

export default function Editor({ note }: EditorProps) {

    const [value, setValue] = useState<string>(note!.content);

    useEffect(() => {

        const saveThisNote = async () => {
            if (note) {
                const updatedNote = { content: value };
                const response = await saveNote(note.id, updatedNote);
                if (response?.note) {
                    setValue(response.note.content);
                }
            }
        }

        const debouncedSave = debounce(saveThisNote, 500);

        debouncedSave();

        return () => {
            debouncedSave.cancel();
        };
    }, [value, note]);


    return (
        <>
            <div className='flex flex-col gap-5 w-full'>

                <MDEditor
                    value={value}
                    onChange={(e) => setValue(e || '')}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    preview='edit'
                />
                <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
            </div>
        </>
    )
}