// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [credentials, setcredentials] = useState({email:"",password:""});
//     const navigate = useNavigate();

//     const handleLogin= async(e)=>{
//         e.preventDefault();
//       
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//          });
//          const json = await response.json()
//          
//          if(json.success){
//             //save auth token and redirect
//             localStorage.setItem("token",json.authtoken);
//             navigate("/")
//         }
//     };
//     const onChange = (e) => {
//         setcredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

    // return (
    //     <div>
    //           <form onSubmit={handleLogin} className="row g-3">
    //         <div className="form-floating mb-3">
    //             <input type="email" className="form-control" id="email" name='email' required value={credentials.email} onChange={onChange} placeholder="name@example.com"/>
    //                 <label htmlFor="email">Email / phone</label>
    //         </div>
    //         <div className="form-floating">
    //             <input type="password" className="form-control" id="password" name='password' value={credentials.password}  onChange={onChange}  placeholder="Password"/>
    //                 <label htmlFor="password">Password</label>
    //         </div>
    //         <div className="col-12">
    //                 <button type="submit" className="btn btn-primary"  >login</button>
    //         </div>
    //         </form>
    //     </div>
    // );
// };

// export default Login

  
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
       

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
         

            if (json.success) {
                // Success: Show toast and redirect
                toast.success("Login successful!");
                localStorage.setItem("token", json.authtoken);
                setTimeout(() => navigate("/"), 1000); // Redirect after 1 seconds
            } else {
                // Error: Show error toast
                toast.error(json.error || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center"style={{ minHeight: "50vh", paddingTop: "50px" }}>
                <form onSubmit={handleLogin} className="row g-3 my-3 p-4 rounded shadow-sm" style={{ width: "500px", backgroundColor: "#E0EEEE" }}>
                    <h2>Login Here..!</h2>
                    {/* Email / Phone Input */}
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="name@example.com" required aria-describedby="emailHelp"/>
                        <label htmlFor="email">Email / Phone</label>
                    </div>

                    {/* Password Input */}
                    <div className="form-floating mb-3">
                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" required minLength={6}/>
                        <label htmlFor="password">Password</label>
                         {/* Toggle Show/Hide Password */}
                         <i
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y me-3`}
                            style={{ cursor: "pointer", color: "#1e90ff" }}
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            title={showPassword ? "Hide Password" : "Show Password"}
                        />
                    </div>

                    {/* Login Button */}
                    <div className="col-12">
                        <button type="submit"className="btn btn-primary w-100">Login</button>
                    </div>

                    {/* Additional Options */}
                    <div className="col-12 text-center mt-3">
                        <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                    </div>
                    <div className="col-12 text-center mt-1">
                        <span>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></span>
                    </div>
            </form>
            </div>
            {/* ToastContainer */}
            <ToastContainer 
                position="top-center" 
                autoClose={1000} 
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

export default Login;
