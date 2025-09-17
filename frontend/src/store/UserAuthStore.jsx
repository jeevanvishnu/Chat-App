import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from 'react-hot-toast'
export const userAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSignup:false,
    isLogedIn:false,
    

    checkAuth : async ()=>{
        try {
            const res =  await axiosInstance.get('/auth/check')
            set({authUser:res.data})
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
        } catch (error) {
            console.log('Error is logout',error);
            toast.error(error.response?.data?.message)
            

        } 
    }
}))

