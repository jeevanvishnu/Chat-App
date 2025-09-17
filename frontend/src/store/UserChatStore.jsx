import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";

export const UseChatStore = create((set , get)=>({
    allContact:null,
    chats:[],
    message:[],
    activeTabs:'chats',
    selectUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnable:JSON.parse(localStorage.getItem('isSoundEnable')) === true,

    toggleSound:()=>{
        localStorage.setItem('isSoundEnable', !get().isSoundEnable)
        set({isSoundEnable:!get().isSoundEnable})
    },

    setActiveTab:((tab)=>set({activeTabs:tab})),
    setSelectedUser:((selectedUser)=>set({selectUser:selectedUser})),

    getAllContacts: async ()=>{
        set({isUserLoading:true})
        try {
            let res = await axiosInstance.get('/message/contacts')
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
            let res = await axiosInstance.get('/message/chats')
            set({chats:res.data})
        } catch (error) {
            console.log("Error of getAllContact",error);
            toast.error(error.response?.data?.message)
        }finally{
            set({isUserLoading:false})
        }
    }
}))