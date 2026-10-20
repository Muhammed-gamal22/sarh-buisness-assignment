import { create } from "zustand";
import { CompanyPackageStoreProps } from '../types'
export const useCompanyPackageStore = create
    <CompanyPackageStoreProps>((set) => ({
        packageData: [],
        setPackageData: (state) => set({ packageData: state })
    }))