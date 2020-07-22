import React from 'react'

import AddMonth from './AddMonth';
import './sidebar_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const element = <FontAwesomeIcon icon={faHandHoldingUsd} />
    return (
        <div className={`sidebar bg-warning`}>
            <h1 className='ml-3'>
                <Link className='text-white' to=''>{element}</Link>
            </h1>
            <AddMonth />
        </div>
    )
}

export default Sidebar
