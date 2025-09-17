import React from 'react'
import { userAuthStore } from '../store/UserAuthStore'
const ChatPage = () => {
  const {Logout} = userAuthStore()
  return (
    <div className='z-10'>
      <button  onClick={Logout}>Logout</button>
    </div>
  )
}

export default ChatPage