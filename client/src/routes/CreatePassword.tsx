import CreatePasswordForm from "@/components/CreatePasswordForm"
import Modal from "@/components/Modal"

type CreatePasswordPageProps = {}

export default function CreatePasswordPage({ }: CreatePasswordPageProps) {
    return (
        <>
            <Modal title="Create Password" isOpen={true} openButtonText="Create Password">
                <CreatePasswordForm />
            </Modal>
        </>
    )
}