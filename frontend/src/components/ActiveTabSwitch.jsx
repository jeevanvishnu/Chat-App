import React from 'react'
import { UseChatStore } from '../store/UserChatStore'
const ActiveTabSwitch = () => {
  const {activeTabs , setActiveTab} = UseChatStore()
  return (
    <div className='tab tabs-boxed bg-transparent p-2 m-2'>
      <button onClick={()=>setActiveTab('chats')}
        className={`tab ${activeTabs === 'chats' ? 'bg-cyan-500/20 text-cyan-400':'text-slate-400'}`}>Chats</button>
      <button onClick={()=>setActiveTab('contacts')}
        className={`tab ${activeTabs === 'contacts' ? 'bg-cyan-500/20 text-cyan-400':'text-slate-400'}`} >Contcts</button>

    </div>
  )
}

export default ActiveTabSwitch