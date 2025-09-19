import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from 'react-hot-toast'
import {io} from "socket.io-client"

 const  baseURL =  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';
export const userAuthStore = create((set , get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSignup:false,
    isLogedIn:false,
    isProfile:false,
    socket:null,
    onlineUsers:[],

    checkAuth : async ()=>{
        try {
            const res =  await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in authUser" , error);
            set({authUser:null})
            
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) =>{
        set({isSignup:true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Account Created Sucessfully")
            get().connectSocket()
        } catch (error) {
            console.log("Error of signup",error)
            toast.error( error.response?.data?.message )
        }finally{
            set({isSignup:false})
        }
    },
    
    Login:async(data)=>{
        set({isLogedIn:true})
        try {
            const res = await axiosInstance.post('/auth/login' , data)
            set({authUser:res.data})
            toast.success("Login sucessfully")
            get().connectSocket()
        } catch (error) {
            console.log('Error of Login',error);
            toast.error(error.response?.data?.message)
            
        }finally{
            set({isLogedIn:false})
        }
    },

    Logout:async()=>{
        
        try {
             await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success('Logout sucessfully')
            get().disconnectSocket()
        } catch (error) {
            console.log('Error is logout',error);
            toast.error(error.response?.data?.message)
            

        } 
    },
    updateProfile:async(data)=>{
        set({isProfile:true})
        try {
            const res = await axiosInstance.put('/auth/profile',data)
            set({authUser:res.data})
            toast.success('Profile updated sucessfully')
        } catch (error) {
            console.log('Errorin updateProfile',error);
            toast.error(error.response?.data?.message)
        }finally{
            set({isProfile:false})
        }
    },

    connectSocket:() =>{
        const {authUser} =  get()
        if(!authUser || get().socket?.connected) return

        const socket = io(baseURL,{withCredentials:true})
        socket.connect()

        set({socket})

        socket.on('getOnlineUser',(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
       if(get().socket.connected) get().socket.disconnect()
    }
}))

