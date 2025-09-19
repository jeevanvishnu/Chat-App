import React, { useEffect } from 'react'
import { UseChatStore } from '../store/UserChatStore'
import { XIcon } from 'lucide-react'
import { userAuthStore } from '../store/UserAuthStore'

const ChatHeader = () => {
    const {selectUser , setSelectedUser} = UseChatStore()
    const {onlineUsers} = userAuthStore()
    const isOnline = onlineUsers.includes(selectUser._id);

    useEffect(()=>{

        const handleEscKey = (e)=>{
            if(e.key === 'Escape') setSelectedUser(null)
                
        }
        window.addEventListener('keydown',handleEscKey)

        // Cleaup function
        return () => window.removeEventListener('keydown',handleEscKey)
    },[setSelectedUser])
  return (
    <div className='flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1'> 
        
        <div className=' flex items-center space-x-3'>
            <div className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'} `}>
                <div className='rounded-full w-12'>
                    <img src={selectUser?.profilePic || '/avatar.png'} alt={selectUser?.fullName} />
                </div>

            </div>
        <div>
        <h3 className='text-slate-200 font-medium'>{selectUser.fullName}</h3>
        <p className='text-slate-400 text-sm'>{isOnline ? "Online" : "Offline"}</p>
        </div>
        </div>

        <button onClick={()=>setSelectedUser(null)} className='w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer'>
        <XIcon className='w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors'/>
        </button>
    </div>
  )
}

export default ChatHeader
