import AddNote from "./AddNote"
import Notes from "./Notes"
import Intro from "./Intro";

const Home = () => {
  const isLogin = localStorage.getItem('token');
  return (
    <div>
      
    {!isLogin?(<Intro/>):
      (
      <><AddNote/>
       <Notes/>
       </>)
    }  
   
    </div>
  )
}
export default Home
