import Navbar from "../../components/navbar/Navbar"
import "./landing.css"
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Navbar_landing from "../../components/navbar_landing/Navbar_landing";


export default function Landing(){
    return (
        <>
            <Navbar_landing/>
            <Hero className="hero"/>

            <Footer/>



        </>);
}