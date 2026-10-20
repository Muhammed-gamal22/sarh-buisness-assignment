import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"


interface ModalLayoutProps {
    children: React.ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
    className?: string
    footer?: React.ReactNode
}
const ModalLayout = ({children, footer ,open,onOpenChange,className}:ModalLayoutProps) => {
    return (
        <Dialog      open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl" className={` left-1/2 -translate-x-1/2 max-w-[95vw] overflow-hidden [&>button]:left-4 ${className} [&>button]:right-auto`}>
                {children}
            </DialogContent>
        </Dialog>
    )
}   

export default ModalLayout