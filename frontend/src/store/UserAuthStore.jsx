import {create} from 'zustand'


export const userAuthStore = create((set)=>({
    authUser:{name:"Jeevan" , _id:1 , age:20},
    loading:false
}))