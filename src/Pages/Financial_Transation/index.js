import React, { useState, useRef } from 'react'
import Rest from '../../utils/Rest'
import Sidebar from '../../components/Sidebar/Sidebar'
import Loading from '../../components/Loading'

//CHART
import LinearChart from '../../components/LinearChart';
import PieChart from '../../components/PieChart';

const day = []
for (let i = 1; i < 32; i++) {
    day.push(i)
}


const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet, usePost, useRemove, usePatch } = Rest(baseURL)

export default function FinancialTransation({ match }) {

    const data = useGet(`movimentacoes/${match.params.month}`)
    const dataMeses = useGet(`meses/${match.params.month}`)
    const [, post] = usePost(`movimentacoes/${match.params.month}`)
    const [, remove] = useRemove()
    const [, patch] = usePatch()
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const refDay = useRef()

    

    const handleDescription = (evt) => {
        setDescription(evt.target.value)
    }
    const handleValue = (evt) => {
        setValue(evt.target.value)
    }

    const onCLick = async () => {
        if (!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await post({
                description: description,
                value: parseFloat(value),
                day: refDay.current.value
            })
        }
        setDescription('')
        setValue(0)
        await data.refetch()
        setTimeout(() => {
            dataMeses.refetch()
        }, 4000)
    }

    const handleRemove = async (id) => {
        await remove(`movimentacoes/${match.params.month}/${id}`)
        await data.refetch()
        setTimeout(() => {
            dataMeses.refetch()
        }, 4000)
    }

    const changePrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.month}`, { previsao_entrada: evt.target.value })
    }
    const changePrevisaoSaida = (evt) => {
        patch(`meses/${match.params.month}`, { previsao_saida: evt.target.value })

    }
        
    return (
        <div className='container body'>
            <Sidebar />
            <h1>Movimentações</h1>
            {
                !dataMeses.loading && dataMeses.data &&
                <div>
                    <span>Entrada: {dataMeses.data.entrada}
                     / Saída: {dataMeses.data.saida}
                    </span><br />
                    <span>
                        Previsão Entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={changePrevisaoEntrada} /> /
                        Previsão Saída: {dataMeses.data.previsao_saida}<input type='text' onBlur={changePrevisaoSaida} />
                    </span>
                </div>
            }
            {data.loading ? <Loading /> :
                <div>
                    <div className='row d-flex justify-content-around mt-3 mb-3'>
                        <LinearChart data={data}/>
                        <PieChart data={data}/>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Descricao</th>
                                <th>Valor</th>
                                <th>Dia</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.data &&
                                Object.keys(data.data).map((id, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.data[id].description}</td>
                                            <td>
                                                {data.data[id].value}
                                            </td>
                                            <td>{data.data[id].day}</td>
                                            <td>
                                                <button className='btn btn-danger ml-2' onClick={() => handleRemove(id)}>-</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td>
                                    <input type='text' value={description} onChange={handleDescription} />
                                </td>
                                <td>
                                    <input type='text' value={value} onChange={handleValue} />
                                </td>
                                <td>
                                    <select className='ml-2 mr-2' ref={refDay}>
                                        {day.map((day, index) => <option key={index} value={day}>{day}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <button className='btn btn-success' onClick={onCLick}>+</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
