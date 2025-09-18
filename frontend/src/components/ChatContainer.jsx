import React, { useEffect } from "react";
import { UseChatStore } from "../store/UserChatStore";
import { userAuthStore } from "../store/UserAuthStore";
import ChatHeader from "./ChatHeader";
import NoHistoryPlaceholder from "./NoHistoryPlaceholder";
import MessageInput from "./MessageInput";
const ChatContainer = () => {
  const { selectUser, getMessageByUserId, message } = UseChatStore();
  const { authUser } = userAuthStore();

  useEffect(() => {
    getMessageByUserId(selectUser._id);
  }, [selectUser, getMessageByUserId]);
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {message.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {message.map((mes) => (
              <div
                className={`chat ${
                  mes.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    mes.senderId === authUser
                      ? "bg-cyan-600"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {mes.text && <p className="mt-2">{mes.text}</p>}
                  <p className="text-sm mt-1 opacity-75 flex items-center gap-1">
                    {new Date(mes.createdAt).toISOString().slice(11, 16)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoHistoryPlaceholder name />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
