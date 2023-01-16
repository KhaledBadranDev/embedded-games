import React from "react";
import { AiOutlineGithub, AiFillYoutube } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa"

const Footer = () => {

    return (
        // Footer 
        <footer className="bg-dark text-center text-white mt-5" >
            <div className="container py-3">
                {/* Section: Social media  */}
                <section className="mb-2">
                    {/* youtube  */}
                    <a className="btn btn-outline-light m-1" href="https://www.youtube.com/channel/UCq1qtlU3urNPLd5yIwhht1w" target="_blank" rel="noreferrer" role="button" style={{ borderRadius: "100%" }}>
                        <AiFillYoutube style={{ color: "red", fontSize: '25px' }} />
                    </a>
                    {/* github  */}
                    <a className="btn btn-outline-light m-1" href="https://github.com/ProgrammingGym" target="_blank" rel="noreferrer" role="button" style={{ borderRadius: "100%" }}>
                        <AiOutlineGithub style={{ fontSize: '25px' }} />
                    </a>
                    {/* blogger  */}
                    <a className="btn btn-outline-light m-1" href="https://programming-gym.blogspot.com/" target="_blank" rel="noreferrer" role="button" style={{ borderRadius: "100%" }}>
                        <FaBloggerB style={{ color: "orange", fontSize: '25px' }} />
                    </a>
                </section>
                {/* End Section: Social media  */}

                <section>
                    <span className="block text-white">
                        © 2022 &nbsp;
                        <a href="https://www.khaledbadran.ca" target="_blank" rel="noreferrer">
                            Khaled Badran
                        </a>
                        .&nbsp;All rights reserved.
                        <br />
                        Built with ❤️
                    </span>
                </section>
            </div>
        </footer>
    );
}

export default Footer