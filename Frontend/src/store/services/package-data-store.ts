import { create } from "zustand";
import { Package } from "@/types";
export const usePackageDataStore = create<{packageData:Package|null,setPackageData:(state:Package)=>void,selectedPackageId:string|null,setSelectedPackageId:(id:string)=>void}>((set)=>({
     packageData:null,
     selectedPackageId:null,
     setPackageData:(state)=>set({packageData:state}),
     setSelectedPackageId:(id)=>set({selectedPackageId:id})
     
}))