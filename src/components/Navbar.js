import React, { useEffect, useState ,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    let Navigate = useNavigate();
    const menuRef = useRef(null); // Ref for the dropdown menu

    const handleLogout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    }

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid mx-3">
                    <Link className="navbar-brand" to="/"> <img src={require('../images/penpaper.png')} alt="iNotebook Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', }}>iNotebook</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className='nav-link active' aria-current="page" to="/">Home</Link></li>
                            {/* <li className="nav-item"><Link className={`nav-link ${location.pathname==="/Profile"?"active": ""}`}to="/Profile">Profile</Link></li> */}
                        </ul>

                        {/* Profile icon */}
                        {localStorage.getItem('token') ? (<div ref={menuRef} style={{ position: "relative" }}>
                            <i className="fa-solid fa-user fa-xl" style={{ color: "#ffffff", cursor: "pointer" }} title="Profile" onClick={toggleMenu}></i>
                            {showMenu && (
                                <div
                                    className="dropdown-menu show"
                                    style={{ position: "absolute", top: "60px", right: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", zIndex: 10, }}
                                >
                                    <Link to="/profile" className="dropdown-item" onClick={() => setShowMenu(false)} style={{ padding: "10px", textDecoration: "none", color: "#000" }}>View Profile</Link>
                                    <button className="dropdown-item"
                                        onClick={handleLogout}
                                        style={{ padding: "10px", textDecoration: "none", color: "#000", border: "none", background: "none", cursor: "pointer", }}>Logout</button>
                                </div>
                            )}

                        </div>)
                            : (<Link to="/login" ><i className="fa-solid fa-arrow-right-to-bracket fa-xl" style={{ color: "#ffffff" }}></i></Link>
                            )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
