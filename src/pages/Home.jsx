import React from "react";
import gif1 from "../assets/gif1.gif";

const Home = () => {

    return (
        <div className="container text-center text-white mt-5 ">
            <h1>Home</h1>
            <img src={gif1} alt="gif" style={{width:"30%",height:"30%"}}/>
        </div>
    );
};

export default Home;