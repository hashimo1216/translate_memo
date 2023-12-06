import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import TranslateMemo from "./views/TranslateMemo";
import './App.css';

export default function App() {
  const currentPathname = useLocation().pathname;

  return ( 
    <>
      <Navbar />
      <Routes>
        <Route path={`/`} element={< Home />}/>
        <Route path={`/login`} element={< Login />}/>
        <Route path={`/signup`} element={< Signup />}/>
        <Route path={`/translate_memo`} element={<TranslateMemo/>}/>
      </Routes>
      { currentPathname === (`/`) && 
        <Footer />
      }
    </>
  )
}
