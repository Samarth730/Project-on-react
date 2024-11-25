import { useState,useEffect,useCallback, useRef  } from 'react'
// import './App.css'

function App() {
  const [length, setlength] = useState(6)
  //we difine to gave a number with allowing false
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [Password,setPassword] = useState("")//we genrate a password so methade will be empty to rende a passowerd on genrator

  // useRef
  const passwordRef = useRef(null)

  const PasswordGenrator = useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="'@!#$%^&*(){}[]'"

    // i want to pic the char in str so we need to looping to allow length
    for (let i = 1; i <=length; i++) {
    // genrate a password it will return index value
    let char = Math.floor(Math.random() * str.length +1)
    // to acsseing the char in str  to pass the value in pass variable
     pass += str.charAt(char)
  }
  
  
  setPassword(pass)

    
    
  },[length,numberAllowed,charAllowed,setPassword])

useEffect(()=>{PasswordGenrator()},[length,numberAllowed,charAllowed,PasswordGenrator])

 const  passwordClipCopyBoard = useCallback(()=>{
  passwordRef.current?.select()//password select or not gothagote
  passwordRef.current?.setSelectionRange(0,3)// selecting only 3 letter
  window.navigator.clipboard.writeText(Password)
 },[Password]) 

  
  
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-3  my-6  text-green-500 bg-orange-700 ' >
      <h1 className='text-center text-white '> Password Genrator</h1>
      <div className='flex flex-wrap shadow overflow-hidden mb-4'>
        <input
         type='text'
         value={Password}
         className='outline-none w-full mb-3 rounded-3xl py-2 px-2 '
         placeholder='password'
         ref={passwordRef}
         />
         <button  onClick = {passwordClipCopyBoard} className='outline-none px-3 py-3.5 shrink-0 mb-1 text-white bg-blue-700'>Copy</button>
        
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer mb-1' 
          onChange={(e)=>{setlength(e.target.value)}}/><label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          // className='cursor-pointer mb-1' 
          onChange={()=>{setNumberAllowed((pre)=>!pre)}}/><label htmlFor='numberInput'>NUMBER</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          // className='cursor-pointer mb-1' 
          onChange={()=>{setCharAllowed((pre)=>!pre)}}/><label htmlFor='characterInput'>CHARACTER</label>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default App
