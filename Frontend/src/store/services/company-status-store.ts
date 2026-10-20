import { create } from "zustand";
import { CompanyStatusStoreProps } from "@/store/types";
export const useCompanyStatusStore = create<CompanyStatusStoreProps>((set)=>({
     statusData:[],
     setStatusData:(state)=>set({statusData:state})
}))