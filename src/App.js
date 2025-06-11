import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
    <Router>
        <Navbar/>
        <div className="container md-3">
        <Routes>

            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/Profile" element={<Profile />}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>

        </Routes>
        </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
