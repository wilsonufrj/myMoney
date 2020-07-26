import React from 'react'
import { Pie } from 'react-chartjs-2';

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

export default function PieChart() {
    return (
        <div className='card'>
            <h1 className='card-header'>Pie Chart</h1>
            <div className='card-body'>
                <Pie data={dataPie}
                    width={300}
                    height={300}
                />
            </div>
        </div>
    )
}
