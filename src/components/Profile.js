import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

function ProfilePage() {
      
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to handle errors

  
    let Navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        Navigate("/login");
    }
    const handleEditProfile = () => {
       
    };

    // Function to fetch user data
     useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'), // Add the token
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUser(data); // Store the user data in state
        } catch (error) {
          setError(error.message); // Handle errors
        }
      };
      fetchUserData();
    }, []);

        
      // Show a loading state while data is being fetched
      if (!user && !error) {
        return <div>Loading...</div>;
      }
      // If there's an error
      if (error) {
        return <div>Error: {error}</div>;
      }

    return (
        <>          
            <div className="d-flex justify-content-center align-items-center"style={{ minHeight: "50vh", paddingTop: "50px" }}>
                <form  className="row g-3 my-3 p-4 rounded shadow-sm w-100" style={{backgroundColor: "#E0EEEE" }}>
                    <div className="d-flex w-100">
                       {/* Left Side - Logo */}
                        <div className="col-md-6 d-flex justify-content-left align-items-center " style={{ borderRight: "1px solid #ccc" }}>
                          <img  src={require('../images/penpaper.png')} style={{width: "150px",height: "150px",border: "3px solid #fff",marginBottom: "15px",}}/>
                          <h1 className='mx-3' style={{ fontSize: "2.5rem", marginBottom: "50px" }}>Welcome to Profile.</h1>
                        </div>

                        {/* Right Side - Profile Details */}
                        <div className="col-md-6 px-4"> 
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user._id}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            {/* // Edit Profile Button */}
                            <button className="btn btn-outline-primary my-3" onClick={handleEditProfile}>
                                Edit Profile
                            </button>
                            {/* button for login sign in */}
                            {!localStorage.getItem('token')? <form className="d-flex" role="search">
                                    <Link className="btn btn-outline-primary" to="/login" role="button">Login</Link>
                            </form>: <button className='btn btn-outline-primary mx-3' onClick={handleLogout}>Logout</button> }
                        </div>
                    </div>
                 </form>
              </div>


              <div className="d-flex justify-content-center align-items-center"style={{ backgroundColor: "#fff", color: "#000", padding: "20px 0" }}>
                <form  className="row g-3 my-3 p-4 rounded shadow-sm w-100" style={{backgroundColor: "#fff" }}>
                    <div className="d-flex w-100">
                          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>iNotebook - Your Digital Notebook</p>
                    <p>Stay organized, stay productive with iNotebook. Access your notes securely, anytime, anywhere.</p>
                  </div>
                  {/* left side */}
                  <div className="col-md-6 d-flex justify-content-left align-items-center " style={{ borderRight: "1px solid #ccc" }}>
                    <div>
                      <p>
                        <a  style={{ color: "#000", textDecoration: "underline" }}>Privacy Policy</a> |
                        <a style={{ color: "#000", textDecoration: "underline" }}>Terms of Service</a>
                      </p>
                      <div>
                      <span>Follow us:</span>
                      <a style={{ color: "#000", margin: "0 10px" }}><i className="fa-brands fa-facebook"></i></a>
                      <a style={{ color: "#000", margin: "0 10px" }}><i className="fa-brands fa-twitter"></i></a>
                      <a style={{ color: "#000", margin: "0 10px" }}><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    <p style={{ marginTop: "15px" }}>© 2025 iNotebook. All rights reserved.</p>
                  </div>
                  </div>
            </form>
            </div>

          </>

    );
}

export default ProfilePage;
