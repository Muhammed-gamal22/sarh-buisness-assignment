import { create } from "zustand";
import { TokenStoreProps } from "../types";

export const useTokenStore = create<TokenStoreProps>((set)=>({
    token:localStorage.getItem("token"),
    setToken:(token)=>set({token}),
    removeToken:()=>set({token:null})
}))