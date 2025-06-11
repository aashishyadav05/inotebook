// import React,{useState}from 'react'
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {

//     const [credentials, setcredentials] = useState({name:"",email:"",password:""});
//     const navigate = useNavigate();

//     const handleSignin= async(e)=>{
//         e.preventDefault();
//         
//         const {name,email,password} = credentials;
//         const response = await fetch('http://localhost:5000/api/auth/createuser', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({name,email,password}),
//          });
//          const json = await response.json()
//          
//             //save auth token and redirect
//             localStorage.setItem("token",json.authtoken);
//             navigate("/")
//     };
//     const onchange = (e) => {
//         setcredentials({ ...credentials, [e.target.name]: e.target.value });
//     };


//     return (
//         <div>
//             <form className="row g-3" onSubmit={handleSignin}>
//             <div className="col-12">
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input type="text" className="form-control" onChange={onchange} name='name' required id="name" placeholder="joh'n Main St"/>
//                 </div>
//                 <div className="col-md-6">
//                     <label htmlFor="semail" className="form-label">Email</label>
//                     <input type="email" className="form-control" onChange={onchange} name='email' required id="semail"/>
//                 </div>
//                 <div className="col-md-6">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" onChange={onchange} name='password' required minLength={8} id="password"/>
//                 </div>
//                 {/* <div className="col-md-6">
//                     <label htmlFor="cpassword" className="form-label">confirm Password</label>
//                     <input type="password" className="form-control" onChange={onchange} name='cpassword' id="cpassword"/>
//                 </div> */}
//                 <div className="col-12">
//                     <button type="submit" className="btn btn-primary">Sign un</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Signup


import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
       
        const { name, email, password } = credentials;

        try {
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();
            
        if (json.success) {
            // Success: Show toast and redirect
            toast.success("Signup successful! Redirecting to home...");
            localStorage.setItem("token", json.authtoken);
            setTimeout(() => navigate("/"), 1000); // Redirect after 1 seconds
        } else {
            // Error handling: Backend validation errors
            if (json.errors && json.errors.length > 0) {
                json.errors.forEach((err) => toast.error(err.msg)); // Show each backend validation error
            } else if (json.error) {
                // Backend general error message (like email already in use)
                toast.error(json.error);
            } else {
                // Fallback error message for unexpected errors
                toast.error("Signup failed. Please try again.");
            }
        }
        
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
             <div className="d-flex justify-content-center align-items-center"style={{ minHeight: "50vh", paddingTop: "50px" }}>
            <form  onSubmit={handleSignin}className="row g-3 my-3 p-4 rounded shadow-sm" style={{ width: "500px", backgroundColor: "#E0EEEE" }}>
                <h2>Sign up..!</h2>
                <div className="col-12">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"className="form-control"onChange={onChange}name="name"requiredid="name"placeholder="John Main St"/>
                </div>
                <div className="col-12">
                    <label htmlFor="semail" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={onChange} name="email" required id="semail"/>
                </div>
                <div className="col-12 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={showPassword ? "text" : "password"} className="form-control" onChange={onChange} name="password" required minLength={8} id="password"/>
                    <i
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y me-3`}
                            style={{ cursor: "pointer", color: "#1e90ff" }}
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            title={showPassword ? "Hide Password" : "Show Password"}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">Sign up</button>
                </div>
                 {/* Additional Options */}
                    <div className="col-12 text-center mt-1">
                        <span>You have an account? <Link to="/login" className="text-decoration-none">Login</Link></span>
                    </div>
            </form>
            </div>

            {/* ToastContainer */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Signup;
