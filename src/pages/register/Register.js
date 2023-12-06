import Navbar_landing from "../../components/navbar_landing/Navbar_landing";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/login/Login";
import Register_win from "../../components/Register_win/Register_win";
import {useRef} from "react";


export default function Register(){


    return (
        <>
            <Navbar_landing/>

            <div className="window">
                <Register_win />
            </div>


            <Footer/>



        </>);
}