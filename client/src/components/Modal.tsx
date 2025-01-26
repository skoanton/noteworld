import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"


type ModalProps = {
    title: string
    description?: string
    children: React.ReactNode
    openButtonText: string
    closeButton?: boolean
    isOpen?: boolean
}

export default function Modal({ title, description, children, openButtonText, closeButton, isOpen }: ModalProps) {

    return (
        <>
            <Dialog open={isOpen}>
                {!isOpen && (

                    <DialogTrigger asChild>
                        <Button>
                            {openButtonText}
                        </Button></DialogTrigger>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && (

                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    {children}
                    {closeButton && (
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    )}

                </DialogContent>
            </Dialog>
        </>
    )
}