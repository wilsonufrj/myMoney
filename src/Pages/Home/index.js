import React from 'react'
import Month from './Month'
import './styles.css'

const Home = () => {
    return (
        <div>
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
