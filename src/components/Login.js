
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function Login(props) {
    const [credentials, setcredentials] = useState({email:"",password:""});
  let navigate=useNavigate();
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});//That means note jaisa hai use aise hi rehne dete hain aur replace karte hain empty string ko input ke through
        }
    const handleSubmit=async(e)=>{
        e.preventDefault();
         //Api call
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: 'POST', 
   
    headers: {
      'Content-Type': 'application/json',
   
    },
   
    body: JSON.stringify({email:credentials.email,password:credentials.password}) 
  });
  const json=await response.json();
  console.log(json);
  if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Loged in successfully","success");
    navigate('/');
  }
  else{
      props.showAlert("Invalid Information","danger");
  }
    }
  return (
    <div className='container my-3'>
             <h2 className='text-center my-5'>Login to continue with INotebook</h2>
       <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" value={credentials.email} className="form-control" onChange={onchange} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} name="password" value={credentials.password} id="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login