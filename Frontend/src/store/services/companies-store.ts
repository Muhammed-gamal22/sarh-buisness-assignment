import { create } from "zustand";
import {Companines} from '../types'
export const useCompanyStore = create<Companines>((set)=>({
    companies:[],
    setCompanies:(state)=>set({companies:state})
}))