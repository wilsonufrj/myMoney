import React from 'react'
import './sidebar_style.css'

const Sidebar = (props) => {
    console.log(props.status)
    return (
        <div>
            <nav className={`bg-warning ${props.status}`}>
                <div className="sidebar-header">
                    <h3>Bootstrap Sidebar</h3>
                </div>
                    
            </nav>
        </div>
    )
}

export default Sidebar