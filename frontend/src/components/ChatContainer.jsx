import React, { useEffect, useRef } from "react";
import { UseChatStore } from "../store/UserChatStore";
import { userAuthStore } from "../store/UserAuthStore";
import { Loader } from "lucide-react";
import ChatHeader from "./ChatHeader";
import NoHistoryPlaceholder from "./NoHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
const ChatContainer = () => {
  const { selectUser, getMessageByUserId, message , isMessageLoading ,subscribeToMessage , unsubscribeFromMessage } = UseChatStore();
  const { authUser } = userAuthStore();
  const messageEndRef = useRef()
  useEffect(() => {
    getMessageByUserId(selectUser._id);
    subscribeToMessage()
    // reset notification
    return () => unsubscribeFromMessage()
  }, [selectUser, getMessageByUserId , subscribeToMessage , unsubscribeFromMessage]);

  useEffect(()=>{
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behaviour : "smooth"})
    }
  },[message])
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {message.length > 0 && ! isMessageLoading? (
          <div className="max-w-3xl mx-auto space-y-6">
            {message.map((mes,i) => (
              <div key={i}
                className={`chat ${
                  mes.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    mes.senderId === authUser._id
                      ? "bg-cyan-600"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                   {mes.image && (
                    <img src={mes.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {mes.text && <p className="mt-2">{mes.text}</p>}
                  <p className="text-sm mt-1 opacity-75 flex items-center gap-1">
                   {new Date(mes.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* Scroll target */}
            <div ref={messageEndRef}/>
          </div>
        ) : isMessageLoading ? <MessagesLoadingSkeleton/> :  (
          <NoHistoryPlaceholder name />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
