import React, { useEffect } from 'react'
import { UseChatStore } from '../store/UserChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
import { userAuthStore } from '../store/UserAuthStore'
const ContactList = () => {
  const {getAllContacts , isUserLoading , allContact , setSelectedUser } = UseChatStore()
  const {onlineUsers} = userAuthStore()
  useEffect(()=>{
    getAllContacts()
  },[getAllContacts])

  if(isUserLoading) return <UsersLoadingSkeleton/>
  
  return (
    <>
      {allContact?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2"
          onClick={() => setSelectedUser(contact)}
        >
          {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
          <div className="flex items-center ">
            <div className={`avatar ${onlineUsers.includes(contact._id)?'avatar-online' : 'avatar-offline'}`}>
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList