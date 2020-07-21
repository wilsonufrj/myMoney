import React,{useState} from 'react'
import AddMonth from './AddMonth'
import Month from './Month'
import './styles.css'
import Sidebar from '../../components/Sidebar'

const Home = () => {

    const [sideBarOpen, setSideBarOpen] = useState(false)

    
    const handleSideBar = ()=>{
        if(!sideBarOpen)
            setSideBarOpen(true)
        else
            setSideBarOpen(false)
    }

    return (
        <div>
            <button onClick={handleSideBar} type="button" id="sidebarCollapse" className="btn btn-info">
                <span>Toggle Sidebar</span>
            </button>
            {sideBarOpen?<Sidebar status={'sidebar'}/>:<Sidebar status={'sidebar close'}/>}
            <AddMonth />
            <Month />
        </div>
    )
}

export default Home