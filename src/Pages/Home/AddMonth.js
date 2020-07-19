import React,{useRef} from 'react'

export default function AddMonth() {

    const minYear = 2015
    const maxYear = 2022
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
        console.log('O ano eh: ',refYear.current.value, refMonth.current.value)
    }

    return (
        <div className='container'>
            <select ref={refYear}>
                {year.map((year,index)=><option key={index} value={year}>{year}</option>)}
            </select>
            <select ref={refMonth}>
                {month.map(num=>addZero(num)).map((month,index)=><option key={index} value={month}>{month}</option>)}
            </select>
            <button onClick={printYearandMonth} className='ml-1'>Adicionar Mês</button>
        </div>
    )
}
