import React, { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import {MessageCircleCodeIcon , LockIcon , MailIcon , UserIcon , LoaderIcon } from "lucide-react"
import { userAuthStore } from '../store/UserAuthStore'
import {Link} from 'react-router'
const SignupPage = () => {
  const [formData , setFormData] = useState({fullname:"" , email:"" ,password:""})
  const {signup , isSignup} = userAuthStore()

  const handleSubmit = (e) =>{
      e.preventDefault()
      signup(formData)
  }
  return (
    <div className=' w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer>
          <div className='w-full flex flex-col md:flex-row'>
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
            <div className='w-full max-w-md'>
              {/* Heading Text */}
              <div className="text-center mb-9">
                <MessageCircleCodeIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
                <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                <p className='text-slate-400'>Sign up for a new account</p>
              </div>
              {/* Form */}
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                   {/* Email Input*/}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter a Password"
                      />
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button className='auth-btn' type='submit' disabled={isSignup}>
                   {isSignup ? (
                  <LoaderIcon className='w-full h-5 animate-spin text-center'/>
                    ) : ( 
                      "Create Account"
                    )}
                   
                  </button>

              </form>

              <div className="mt-6 text-center">
                <Link to='/login' className='auth-link'>
                Already have an account ? Login
                </Link>
              </div>
            </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>

    </div>
  )
}

export default SignupPage