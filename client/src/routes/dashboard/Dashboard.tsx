import NoteList from "@/components/NoteList"

type DashboardProps = {}

export default function DashboardPage({ }: DashboardProps) {
    return (
        <div className="flex flex-col gap-5 w-full p-5">
            <NoteList />
        </div>
    )
}