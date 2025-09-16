import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"

export const userAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,

    checkAuth : async ()=>{
        try {
            const res =  await axiosInstance.get('/api/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in authUser" , error);
            set({authUser:null})
            
        }finally{
            set({isCheckingAuth:false})
        }
    }
}))