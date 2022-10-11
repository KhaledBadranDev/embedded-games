import React from "react";
import CustomLink from "./CustomLink";
import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark py-2">
            <div className="container">
                <Link to="./" className="nav-link text-white">Web4Game</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                            <CustomLink to="./" className="nav-link text-primary">Home</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="./Scratch" className="nav-link text-primary">Scratch Games</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="./Codesters" className="nav-link text-primary">Codesters Games</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="./admins" className="nav-link text-primary">Admins</CustomLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar