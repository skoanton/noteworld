import LoginForm from "@/components/LoginForm"
import Modal from "@/components/Modal"
import { ModeToggle } from "@/components/mode-toggle"

type IndexPageProps = {}

export default function IndexPage({ }: IndexPageProps) {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen gap-5">
                <h1 className="text-6xl font-bold">Note World</h1>
                <Modal title="Login" openButtonText="Login">
                    <LoginForm />
                </Modal>
            </div>
        </>
    )
}