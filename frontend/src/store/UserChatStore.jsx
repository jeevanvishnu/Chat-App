import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
import { userAuthStore } from "./UserAuthStore";

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
    },

    getMessageByUserId:async(userId) =>{
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({message:res.data})
        } catch (error) {
           console.log('Error is getmessageuserid',error);
           toast.error(error?.response?.data?.message || "Somthing wrong")
            
        }finally{
            set({isMessageLoading:false})
        }
    },

    sendMessage: async(messageData) =>{
        const {selectUser , message} = get();
        const {authUser} = userAuthStore.getState();
        const temp_id = `temp-${Date.now()}`;
        const optimisticCode = {
            _id:temp_id,
            senderId:authUser?._id,
            receviedId:selectUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt: new Date().toISOString()
        }
        set({message:[...message,optimisticCode]})
        try {
            const res = await axiosInstance.post(`/message/send/${selectUser._id}`,messageData)
            set({message:message.concat(res.data)})
        } catch (error) {
            set({message:message})
            console.log("Error is sendMessage" , error);
            toast.error(error?.response?.data?.message|| "Something Wrong")
        }
    }
}))