import React,{useEffect,useState} from 'react'
import { Link, Redirect } from 'react-router-dom';

import AddMonth from './AddMonth';
import './sidebar_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'


const element = <FontAwesomeIcon icon={faHandHoldingUsd} />


const Sidebar = () => {
    const [logado,setLogado] = useState(false)
    const [forcedRedirect,setForcedRedirect]= useState(false)
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }else{

        }
    })
    const logOut = ()=>{
        localStorage.removeItem('token')
        setLogado(false)
        setForcedRedirect(true)
    }

    if(forcedRedirect)
        return <Redirect to='/login'/>

    return (
        <div className={`sidebar bg-warning`}>
            <h1 className='ml-3'>
                <Link className='text-white' to='/'>{element}</Link>
            </h1>
            <AddMonth/>
            {logado && <button className='btn btn-info mt-5 ml-3' onClick={logOut}>Sair</button> }
        </div>
    )
}

export default Sidebar
