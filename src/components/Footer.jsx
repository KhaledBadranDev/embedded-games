import React from "react";
import { AiOutlineGithub , AiFillYoutube} from "react-icons/ai";
import {FaBloggerB} from "react-icons/fa"

const Footer = () => {

    return (
        // Footer 
        <footer className="bg-dark text-center text-white" style={{ marginTop: "20px" }}>
            <div className="container p-4">
                {/* Section: Social media  */}
                <section className="mb-4">
                    {/* Facebook  */}
                    <a className="btn btn-outline-light m-2" href="#!" role="button" style={{borderRadius: "50%"}}>
                        <AiOutlineGithub style={{fontSize: '30px'}}/>
                    </a>

                    {/* Google  */}
                    <a className="btn btn-outline-light m-2" href="#!" role="button" style={{borderRadius: "50%"}}>
                        <AiFillYoutube style={{color:"red", fontSize: '30px'}}/>
                    </a>

                    {/* Linkedin  */}
                    <a className="btn btn-outline-light m-2" href="#!" role="button" style={{borderRadius: "50%"}}>
                        <FaBloggerB style={{color:"orange", fontSize: '30px'}}/>    
                    </a>
                </section>
                {/* End Section: Social media  */}

                {/* Start Section: Text  */}
                <section className="mb-4">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                        eum harum corrupti dicta, aliquam sequi voluptate quas.
                    </p>
                </section>
                {/* End Section: Text  */}
            </div>
            {/* Start Copyright  */}
            <div className="text-center p-3">
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
            {/* End Copyright  */}
        </footer>
    );
}

export default Footer