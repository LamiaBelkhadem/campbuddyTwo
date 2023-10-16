import Navbar from "../../components/navbar/Navbar"
import "./home.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

export default function Home(){
    return (
        <>
            <Navbar/>
            <div className="home-container">

                <Sidebar className="sidebar"/>
                <Feed/>
                <Rightbar/>

            </div>

            <Footer/>
            </>);
}