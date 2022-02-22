
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate();
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});//That means note jaisa hai use aise hi rehne dete hain aur replace karte hain empty string ko input ke through
        }
    const handleSubmit=async(e)=>{
        e.preventDefault();
         //Api call
        
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
    method: 'POST', 
   
    headers: {
      'Content-Type': 'application/json',
   
    },
    body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password })
  });
  const json=await response.json();
  console.log(json);
 if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Account created successfully","success")
    navigate('/');
 }
 else{
   props.showAlert('Invalid Credentials',"danger");
 }
    }
  return (
    <div>
       <div className="container my-3">
         <h2 className='text-center my-5'>Create a Account to continue with INotebook</h2>
       <form  onSubmit={handleSubmit}>
       <div class="mb-3">
    <label htmlFor="name" class="form-label">Username</label>
    <input type="name" class="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div class="mb-3">
    <label htmlFor="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange}/>
   
  </div>
  <div class="mb-3">
    <label htmlFor="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name='password'  value={credentials.password} onChange={onchange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label htmlFor="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange} minLength={5} required/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
       </div>
    </div>
  )
}

export default Signup
