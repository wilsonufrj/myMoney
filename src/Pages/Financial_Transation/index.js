import React, { useState } from 'react'
import Rest from '../../utils/Rest'
import Sidebar from '../../components/Sidebar/Sidebar'
import Loading from '../../components/Loading'

//CHART
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

const dataChart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  const dataPie = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

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
        await data.refetch()
        setTimeout(()=>{
            dataMeses.refetch()
        },4000)
    }

    const handleRemove = async (id) => {
        await remove(`movimentacoes/${match.params.month}/${id}`)
        await data.refetch()
        setTimeout(()=>{
            dataMeses.refetch()
        },4000)
    }

    const changePrevisaoEntrada = (evt)=>{
        patch(`meses/${match.params.month}`,{previsao_entrada:evt.target.value})
    }
    const changePrevisaoSaida = (evt)=>{
        patch(`meses/${match.params.month}`,{previsao_saida:evt.target.value})

    }

    return (
        <div className='container body'>
            <Sidebar/>
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
            {data.loading ? <Loading/> :
                <div>
                    <div className='row d-flex justify-content-around mt-3 mb-3'>
                        <div className='card'>
                            <h1 className='card-header'>Linear Chart</h1>
                            <div className='card-body'>
                                <Line data={dataChart}
                                    width={500}
                                    height={300}
                                />
                            </div>
                        </div>
                        <div className='card'>
                            <h1 className='card-header'>Pie Chart</h1>
                            <div className='card-body'>
                            <Pie data={dataPie}
                                width={300}
                                height={300}
                            />
                            </div>
                        </div>
                    </div>
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
                </div>
            }
        </div>
    )
}
