import React from 'react'
import { Route , Routes ,Navigate} from 'react-router-dom'
import SignupPage from './page/SignupPage'
import ChatPage from './page/ChatPage'
import LoginPage from './page/LoginPage'
import { userAuthStore } from './store/UserAuthStore'
import PageLoader from './components/PageLoader'
import { useEffect } from 'react'
const App = () => {
  const {checkAuth ,isCheckingAuth,authUser } = userAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser);

  if(isCheckingAuth) return <PageLoader/>
  
  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route path='/' element={authUser ? <ChatPage/>: <Navigate to='/login'/> }></Route>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={'/'}/>}></Route>
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to={'/'}/>}></Route>
      </Routes>
    </div>
  )
}

export default App