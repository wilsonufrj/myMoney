import React,{useRef,useState} from 'react'
import {Redirect} from 'react-router-dom'

export default function AddMonth() {

    const minYear = 2015
    const maxYear = 2022
    const [redir,setRedir] = useState('')
    const year = []
    const month = []

    const refYear = useRef()
    const refMonth = useRef()

    for(let i=minYear;i<maxYear;i++){
        year.push(i)
    }
    for(let i=1;i<=12;i++){
        month.push(i)
    }

    const addZero = (num)=>{
        if(num<10)
            return '0'+ num
        return num
    }

    const printYearandMonth = ()=>{
        setRedir(refYear.current.value+'-'+ refMonth.current.value)
    }

    if(redir!==''){
        return <Redirect to={`movimentacoes/${redir}`}/>
    }

    return (
        <div className='d-flex flex-column'>
        <label className=' ml-4 mt-1 text-white font-weight-bold'>Ano</label>
            <select className='ml-2 mr-2' id='year' ref={refYear}>
                {year.map((year,index)=><option key={index} value={year}>{year}</option>)}
            </select>
            <label className=' ml-4 mt-1 text-white font-weight-bold'>Mês</label>
            <select className='ml-3 mr-3' ref={refMonth}>
                {month.map(num=>addZero(num)).map((month,index)=><option key={index} value={month}>{month}</option>)}
            </select>
            <button onClick={printYearandMonth} className='ml-2 mt-2 mr-2 btn btn-info'>
                Add
            </button>
        </div>
    )
}
