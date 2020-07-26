import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2';

const day = []
for (let i = 1; i < 32; i++) {
    day.push(i)
}

const LinearChart = ({data}) => {
    const [money,setMoney]=useState([])
    const [dayMonth,setDayMonth]=useState([])

    const gain = []
    const spend = []

    const dataChart = {
        labels: dayMonth,
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.2,
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
                data: money,
            }
        ]
    }

    const auxValue = []
    const auxDay = []
    useEffect(()=>{
        if(data)
            Object.keys(data.data).map((mov)=>{
                auxValue.push(data.data[mov].value)
                auxDay.push(data.data[mov].day)
            })

        auxValue.forEach((value)=>{
            if(value>0){
                gain.push(value)
            }else{
                spend.push(value)
            }
        })

        //TODO: Fazer um jeito que o grafico mostre os valores reais de ganho e gasto

    },[])

    return (
        <div className='card'>
            <h1 className='card-header'>Linear Chart</h1>
            <div className='card-body'>
                <Line data={dataChart}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    )
}

export default LinearChart