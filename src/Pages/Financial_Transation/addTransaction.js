import React, { useState,useRef } from 'react'

export default function AddTransaction({ onCLicky }) {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const refDay = useRef()

    const handleDescription = (evt) => {
        setDescription(evt.target.value)
    }
    const handleValue = (evt) => {
        setValue(evt.target.value)
    }

    const day = []
    for (let i = 1; i < 32; i++) {
        day.push(i)
    }
    const addZero = (num)=>{
        if(num<10)
            return '0'+ num
        return num
    }

    const onCLick = async () => {
        if (!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await onCLicky({
                description: description,
                value: parseFloat(value),
                day:refDay.current.value
            })
        }
        setDescription('')
        setValue(0)
    }
    return (
        <tr>
            <td>
                <input type='text' value={description} onChange={handleDescription} />
            </td>
            <td>
                <input type='text' value={value} onChange={handleValue} />

            </td>
            <td>
                <select className='ml-3 mr-3' ref={refDay}>
                    {day.map(num => addZero(num)).map((day, index) => <option key={index} value={day}>{day}</option>)}
                </select>
            </td>
            <td>
                <button className='btn btn-success ml-2' onClick={onCLick}>+</button>
            </td>
        </tr>
    )
}
