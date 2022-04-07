import React, { useState } from 'react'
import { MdLogin } from 'react-icons/md';
import '../stylesheets/auth.css'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


function RegisterPage() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  const register = async()=>{
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword( auth,email,password )
      console.log(result)
      toast.success('Registration Successfull')
      window.location.href='/login'
      setLoading(false)
      setEmail('')
      setPassword('')
      setCPassword('')

    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Registration Failed')
      
    }
  }
  return (
   <div  className='image'>
   
    <section>
      <div className="flex min-h-screen overflow-hidden">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-z lg:flex-none lg:px-20 xl:px-24">
        {loading && (<Loader/>)}
          <div className="rounded-2xl w-full max-w-xl mx-auto lg:w-96 shadow-2xl shadow-slate-800 px-10 py-10">
            <div>
              <h2 className="mt-6 text-4xl font-extrabold text-neutral-600"> Register </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">

              <div className="space-y-1 mt-2">
              <label for="password" className="block text-md font-medium text-neutral-600"> Email </label>
              <div className="mt-1">
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="email" autocomplete="current-email" required="" placeholder="Your Email" className="
            block
            w-full
            px-5
            py-3
            text-base
            placeholder-gray-300
            transition
            duration-500
            ease-in-out
            transform
            border border-transparent
            rounded-lg
            text-neutral-600
            bg-gray-50
            focus:outline-none
            focus:border-transparent
            focus:ring-2
            focus:ring-white
            focus:ring-offset-2
            focus:ring-offset-gray-300
          "/>
              </div>
            </div>
                  
                  <div className="space-y-1 mt-2">
                    <label for="password" className="block text-md font-medium text-neutral-600"> Password </label>
                    <div className="mt-1">
                      <input value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Your Password" className="
                  block
                  w-full
                  px-5
                  py-3
                  text-base
                  placeholder-gray-300
                  transition
                  duration-500
                  ease-in-out
                  transform
                  border border-transparent
                  rounded-lg
                  text-neutral-600
                  bg-gray-50
                  focus:outline-none
                  focus:border-transparent
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-gray-300
                "/>
                    </div>
                  </div>
                  <div className="space-y-1 mt-2">
                    <label for="cpassword" className="block text-md font-medium text-neutral-600"> Confirm Password </label>
                    <div className="mt-1">
                      <input value={cpassword} onChange={(e) => { setCPassword(e.target.value) }} id="cpassword" name="password" type="password" autocomplete="current-password" required="" placeholder="Confirm Password" className="
                  block
                  w-full
                  px-5
                  py-3
                  text-base
                  placeholder-gray-300
                  transition
                  duration-500
                  ease-in-out
                  transform
                  border border-transparent
                  rounded-lg
                  text-neutral-600
                  bg-gray-50
                  focus:outline-none
                  focus:border-transparent
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-gray-300
                "/>
                    </div>
                  </div>
                  <div>
                    <button onClick={register} type="submit" className=" mt-5
                flex
                items-center
                justify-center
                w-full
                px-10
                py-4
                text-base
                font-medium
                text-center text-white
                transition
                duration-500
                ease-in-out
                transform
                bg-blue-600
                rounded-xl
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-blue-500
              "> Register </button>
                  </div>
                <div className="relative my-4">
                  
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2  text-black"> Or continue with </span>
                  </div>
                </div>
                <div>
                  <button type="submit" className="
              w-full
              items-center
              block
              px-10
              py-3.5
              text-base
              font-medium
              text-center text-blue-600
              transition
              duration-500
              ease-in-out
              transform
              border-2 border-white
              shadow-md
              rounded-xl
              hover:outline-none
              hover:ring-2
              hover:ring-offset-2
            ">
            <Link to="/login">
                    <button className="flex items-center justify-center px-8">
                      <MdLogin className='mt-1 text-3xl text-green-500' />
                      <span className="ml-3 text-white text-2xl">Log In </span>
                    </button>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block z-50">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_5tkzkblw.json" mode="bounce" background="transparent"  speed="1"   loop  autoplay></lottie-player>
        </div>
      </div>

    </section>
    </div>

  )
}

export default RegisterPage