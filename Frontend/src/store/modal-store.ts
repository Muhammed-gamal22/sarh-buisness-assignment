import { ModalStoreProps } from "@/types"
import { create } from "zustand"
const useModalStore = create<ModalStoreProps>((set) => ({
    isOpen: false,
    setOpen: (v) => set({ isOpen: v })

}))
export default useModalStore