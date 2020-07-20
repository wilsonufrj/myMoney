import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import './navbar_style.css'

const element = <FontAwesomeIcon icon={faHandHoldingUsd} />

const Navbar = () => {
   return( 
    <nav className='navbar navbar-light bg-warning'>
        <div className='container-fluid'>
            <Link to='/' className='navbar-brand text-white font-weight-bold' id="navbar">{element} My money</Link>
        </div>
    </nav>
   )
}

export default Navbar