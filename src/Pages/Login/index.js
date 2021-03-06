import React,{useEffect,useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './styles.css'

import { usePostLogin } from '../../utils/Rest'
import { Redirect } from 'react-router-dom'

const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Pti1yaSLR-H-P8i8Oa0ZoK-vGfXKUHw'


export default function Login() {

    const [dataPost, singin] = usePostLogin(URL)
    const [logado,setLogado] = useState(false)
    useEffect(()=>{
        if(Object.keys(dataPost.data).length>0){
            localStorage.setItem('token',dataPost.data.idToken)
            setLogado(true)
        }
    },[dataPost])

    const token = localStorage.getItem('token')

    const login = async() => {
        await singin({
            email: "wilson@react.com",
            password: "abc123",
            returnSecureToken: true
        })
    }

    if(logado || token!==null )
        return <Redirect to='/'/>

    return (
        <div className='body'>
            <Sidebar />
            <h1>Login</h1>
            <button onClick={login} className="btn btn-dark">Logar</button>
            
        </div>
    )
}