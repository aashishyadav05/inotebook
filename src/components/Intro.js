import React from 'react';
import penpaper from '../images/pencil.png';
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
        <div className="info-page my-5">
            <img src={penpaper} alt="iNotebook Logo" style={{width: "150px",height: "150px",border: "3px solid #fff",marginBottom: "15px",}}/>
          <h1 style={{ fontSize: "2.8rem", marginBottom: "50px" }}>
            Welcome to iNotebook!
          </h1>

            <form className='my-3' style={{ fontFamily:'Cursive',fontSize: "1.8rem", lineHeight: "1.3" }}>
            iNotebook is your personal, secure, and efficient digital notebook designed to simplify your life. With iNotebook, you can store, organize, and access your notes anytime and anywhere. Login or sign up to create notes, categorize them, and never lose track of your ideas again. 
            </form>
            

            <h1 style={{ fontSize: "1rem", marginTop: "70px" }}>
                 To Add Note Please Login <Link  to="/login" role="button">Login</Link>
             </h1>

        </div>
      )
}

export default Intro
