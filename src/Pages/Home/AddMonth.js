import React from 'react'

export default function AddMonth() {
    return (
        <div className='container'>
            <select>
                <option value='2019'>2019</option>
                <option value='2020'>2020</option>
            </select>

            <select>
                <option value='07'>07</option>
                <option value='08'>08</option>
            </select>
            <button className='ml-1'>Adicionar Mês</button>
        </div>
    )
}
