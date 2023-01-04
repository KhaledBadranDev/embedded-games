import React from "react";
import {isDocInDb} from "../utils/utils"

const test = async()=>{
    try {
        const res = await isDocInDb("scratch", 123)        
        console.log("res::", res)
    } catch (error) {
        console.log("error::", error)
    }
}

const Home = () => {
    test()
    

    return (
        <div className="container text-center text-white mt-5">
            <h1>Home</h1>
        </div>
    );
};

export default Home;