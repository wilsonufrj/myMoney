import React from 'react'
import Month from './Month'
import './styles.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Home = () => {

    return (
        <div>
            <Sidebar/>
            <div className='body'>
                <div>
                    <h1>Bem-Vindo ao My money</h1>
                </div>
                <Month />
            </div>

        </div>
    )
}

export default Home
