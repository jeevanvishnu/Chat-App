import React, { useState } from 'react'
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleCodeIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from 'react-router';
import { userAuthStore } from '../store/UserAuthStore';
const LoginPage = () => {
  const [formData ,setFormData] = useState({ email:"" , password:""})
  const {isLogedIn , Login} = userAuthStore()

  const handleSubmit = (e) =>{
    e.preventDefault()
    Login(formData)
  }
  return (
    <div className=" w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* Heading Text */}
                <div className="text-center mb-9">
                  <MessageCircleCodeIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access to your account </p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                 

                  {/* Email Input*/}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="JohnDoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter a Password"
                      />
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLogedIn}
                  >
                    {isLogedIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an acount ? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect anytime, anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage