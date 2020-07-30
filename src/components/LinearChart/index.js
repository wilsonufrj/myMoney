import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

const day = []
for (let i = 1; i < 32; i++) {
    day.push(i)
}

const LinearChart = ({ data }) => {
    const [money, setMoney] = useState({
        gain: new Map(),
        spend: new Map(),
    })
    const [dayMonth, setDayMonth] = useState([])
    const [total, setTotal] = useState([])

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
                data: total,
            }
        ]
    }

    const auxGain = new Map()
    const auxSpend = new Map()
    const auxDay = []
    useEffect(() => {
        if (data)
            Object.keys(data).map((transaction) => {
                if (auxDay.indexOf(data[transaction].day) === -1)
                    auxDay.push(data[transaction].day)
                if (data[transaction].value > 0) {
                    auxGain.set(data[transaction].day, data[transaction].value)
                } else {
                    auxSpend.set(data[transaction].day, data[transaction].value)
                }
            })

        setDayMonth(auxDay.sort())
        setMoney({
            gain: auxGain,
            spend: auxSpend
        })
    }, [])

    useEffect(() => {
        const auxTotal = []
        for (let i = 0; i < dayMonth.length; i++) {
            if (money.spend.has(dayMonth[i]) && money.gain.has(dayMonth[i])) {
                if (i === 0) {
                    let totalParcial = money.gain.get(dayMonth[i]) + money.spend.get(dayMonth[i])
                    auxTotal.push(totalParcial)
                 }
                else {
                    let totalParcial = money.gain.get(dayMonth[i]) + money.spend.get(dayMonth[i])
                    let recupera = auxTotal[i - 1] + totalParcial
                    auxTotal.push(recupera)
                }

            } else {
                if (money.gain.has(dayMonth[i])) {
                    if (i === 0) {
                        let totalParcial = money.gain.get(dayMonth[i])
                        auxTotal.push(totalParcial)
                     }
                    else {
                        let totalParcial = money.gain.get(dayMonth[i])
                        let recupera = auxTotal[i - 1] + totalParcial
                        auxTotal.push(recupera)
                    }
                }
                if (money.spend.has(dayMonth[i])) {
                    if (i === 0) {
                        let totalParcial = money.spend.get(dayMonth[i])
                        auxTotal.push(totalParcial)
                     }
                    else {
                        let totalParcial = money.spend.get(dayMonth[i])
                        let recupera = auxTotal[i - 1] + totalParcial
                        auxTotal.push(recupera)
                    }
                }
            }
        }
        setTotal(auxTotal)
    }, [dayMonth])


    return (
        <div className='card'>
            <h1 className='card-header'>Resumo do Mês</h1>
            <div className='card-body'>
                <Line data={dataChart}
                    width={1000}
                    height={300}
                />
            </div>
        </div>
    )
}

export default LinearChart