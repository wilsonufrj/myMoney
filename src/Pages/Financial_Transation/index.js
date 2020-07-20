import React, { useState } from 'react'
import Rest from '../../utils/Rest'


const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet, usePost, useRemove,usePatch } = Rest(baseURL)

export default function FinancialTransation({ match }) {

    const data = useGet(`movimentacoes/${match.params.month}`)
    const dataMeses = useGet(`meses/${match.params.month}`)
    const [, post] = usePost(`movimentacoes/${match.params.month}`)
    const [, remove] = useRemove()
    const [, patch] = usePatch()
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const handleDescription = (evt) => {
        setDescription(evt.target.value)
    }
    const handleValue = (evt) => {
        setValue(evt.target.value)
    }

    const onCLick = async () => {

        if(!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >=0 ){
            await post({
                description: description,
                value: parseFloat(value)
            })
        }
        setDescription('')
        setValue(0)
        data.refetch()
        setTimeout(()=>{
            dataMeses.refetch()
        },5000)
    }

    const handleRemove = async (id) => {
        await remove(`movimentacoes/${match.params.month}/${id}`)
        data.refetch()
        setTimeout(()=>{
            dataMeses.refetch()
        },5000)
    }

    const changePrevisaoEntrada = (evt)=>{
        patch(`meses/${match.params.month}`,{previsao_entrada:evt.target.value})
    }
    const changePrevisaoSaida = (evt)=>{
        patch(`meses/${match.params.month}`,{previsao_saida:evt.target.value})

    }

    return (
        <div className='container'>

            <h1>Movimentações</h1>
            {
                !dataMeses.loading && dataMeses.data &&
                 <div>
                    <span>Entrada: {dataMeses.data.entrada}
                     / Saída: {dataMeses.data.saida}
                    </span><br/>
                    <span>
                        Previsão Entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={changePrevisaoEntrada}/> /
                        Previsão Saída: {dataMeses.data.previsao_saida}<input type='text' onBlur={changePrevisaoSaida}/>
                    </span>
                </div>
            }
            {data.loading ? <span>Loading...</span> :
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Value</th>
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
                                <button className='btn btn-success ml-2' onClick={onCLick}>+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    )
}
