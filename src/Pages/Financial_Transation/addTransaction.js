import React,{useState} from 'react'

export default function AddTransaction({onCLicky}) {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const handleDescription = (evt) => {
        setDescription(evt.target.value)
    }
    const handleValue = (evt) => {
        setValue(evt.target.value)
    }

    const onCLick = async ()=>{
        if (!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await onCLicky({
                description: description,
                value: parseFloat(value)
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
                <button className='btn btn-success ml-2' onClick={onCLick}>+</button>
            </td>
         </tr>
    )
}
