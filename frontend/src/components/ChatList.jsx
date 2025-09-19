import React, { useEffect } from "react";
import { UseChatStore } from "../store/UserChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatFound from "./NoChatFound";
import { userAuthStore } from "../store/UserAuthStore";
const ChatList = () => {
  const { chats, getMyChatPartner, isUserLoading, setSelectedUser } =
    UseChatStore();
  const {onlineUsers} = userAuthStore()

  useEffect(() => {
    getMyChatPartner();
  }, [getMyChatPartner]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2"
          onClick={() => setSelectedUser(chat)}
        >
          {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id)? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
