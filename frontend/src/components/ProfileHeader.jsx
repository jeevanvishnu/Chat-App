import React, { useRef, useState } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { userAuthStore } from "../store/UserAuthStore";
import { UseChatStore } from "../store/UserChatStore";
const mouseClickSound  = new Audio('/sounds/mouse-click.mp3')

const ProfileHeader = () => {
  const { Logout, authUser, updateProfile,isProfile } = userAuthStore();
  const { isSoundEnable,toggleSound } = UseChatStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUplode = (e) => {
    const file = e.target.files[0]

    if(!file) return 

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () =>{
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfile({profilePic:base64Image})
    }
  };
  return (
    <div className="p-6 border-b border-r-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avathar */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() =>  fileInputRef.current.click()}
            >
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="user-image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">{isProfile ? "Updating" : "Change"}</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUplode}
              className="hidden"
            />
          </div>
          {/* UserName & Online Text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={Logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnable ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
