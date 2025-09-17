import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";

export const UseChatStore = create((set , get)=>({
    allContact:null,
    chat:[],
    message:[],
    activeTabs:'chats',
    selectUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnable:localStorage.getItem('isSoundEnable') === true,

    toggleSound:()=>{
        localStorage.setItem('isSoundEnable', !get().isSoundEnable)
        set({isSoundEnable:!get().isSoundEnable})
    },

    activeUser:((tab)=>set({activeTabs:tab})),
    setSelectedUser:((selectedUser)=>set({selectUser:selectedUser})),

    getAllContacts: async ()=>{
        set({isUserLoading:true})
        try {
            let res = await axiosInstance.get('/message/contact')
            set({allContact:res.data})
        } catch (error) {
            console.log("Error of getAllContact",error);
            toast.error(error.response?.data?.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMyChatPartner:async()=>{
         set({isUserLoading:true})
        try {
            let res = await axiosInstance.get('/message/chat')
            set({chat:res.data})
        } catch (error) {
            console.log("Error of getAllContact",error);
            toast.error(error.response?.data?.message)
        }finally{
            set({isUserLoading:false})
        }
    }
}))