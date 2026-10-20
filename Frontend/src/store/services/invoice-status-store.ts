import { create } from "zustand";
import { InvoiceStatusStoreProps } from "@/store/types";
export const useInvoiceStatusStore = create<InvoiceStatusStoreProps>((set)=>({
     statusData:[],
     setStatusData:(state)=>set({statusData:state})
}))