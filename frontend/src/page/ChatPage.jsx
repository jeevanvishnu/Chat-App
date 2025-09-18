import React from 'react'
import {UseChatStore} from "../store/UserChatStore"
import { userAuthStore } from '../store/UserAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'

const ChatPage = () => {
  const {activeTabs , selectUser} = UseChatStore()
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/* Left side */}
        <div className='w-80 bg-slate-800/50 backdrop:blur-sm flex flex-col'>
         <ProfileHeader/>
         <ActiveTabSwitch/>

         <div className='flex-1 overflow-auto p-4 space-y-2'>
          {activeTabs === "chats" ? <ChatList/> : <ContactList/>}

         </div>
        </div>

        {/* Right Side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop:blur-sm'>
          {selectUser ? <ChatContainer/> : <NoConversationPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage