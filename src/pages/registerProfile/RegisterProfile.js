import Footer from "../../components/Footer/Footer";
import RegisterProfileWin from "../../components/registerProfileWin/RegisterProfileWin";
import Navbar from "../../components/navbar/Navbar";


export default function RegisterProfile(){


    return (
        <>
            <Navbar/>

            <div className="window">
                <RegisterProfileWin />
            </div>


            <Footer/>



        </>);
}