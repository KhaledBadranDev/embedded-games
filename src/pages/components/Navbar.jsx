import React, { useState, useCallback } from "react";
import CustomLink from "./CustomLink";
import { Link } from 'react-router-dom';
import './Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css"


// reference/documentation: https://dev.to/johnotu/how-to-toggle-bootstrap-navbar-collapse-button-in-react-without-jquery-joo

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapseCallBack = useCallback(() => setIsNavCollapsed(!isNavCollapsed), [isNavCollapsed]);

    return (
        <nav class="navbar navbar-expand-md bg-dark navbar-dark py-2">
            <div className="container">
                <Link to="./" className="navbar-brand text-info font-weight-bolder">EmbeddedGames</Link>

                <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#toggleableNavbar" aria-controls="toggleableNavbar" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapseCallBack}>
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="toggleableNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
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
    );

}

export default Navbar