import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand">Coding</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link active" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/products'} className="nav-link">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">Pricing</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
