import Modal from "@/components/Modal"
import RegisterForm from "@/components/RegisterForm"

type AdminPageProps = {}

export default function AdminPage({ }: AdminPageProps) {
    return (
        <>
            <Modal title="Create User" openButtonText="Create User" closeButton={true}>
                <RegisterForm />
            </Modal>
        </>
    )
}