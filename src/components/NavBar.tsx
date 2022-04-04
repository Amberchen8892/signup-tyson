import React from 'react';
import wypeLogo from '../images/wype.svg';

export default function NavBar() {
  return (
    <>
       <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://wype-demo-tyson.netlify.app/">
              <img src={wypeLogo} width="60px" height="50px" alt="WYPE"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://wype-demo-tyson.netlify.app/">Home</a>
              </li>
            </ul>
            <span className="navbar-text">
              <button type="button" className="btn btn-secondary"><a href="https://wype-dashboard-demo.netlify.app/" style={{color:'white', textDecoration: 'none'}}>Dashboard</a></button>
            </span>
          </div>
        </div>
    </nav>
  </>
  )
}
