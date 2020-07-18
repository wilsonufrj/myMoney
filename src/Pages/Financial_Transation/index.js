import React from 'react'
import Rest from '../../utils/Rest'


const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet } = Rest(baseURL)

export default function FinancialTransation({ match }) {

    const data = useGet(`movimentacoes/${match.params.month}`)

    return (
        <div className='container'>
            <h1>Movimentações</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Value</th>
                    </tr>
                </thead>

                <tbody>
                    {data.data &&
                        Object.keys(data.data).map((id, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.data[id].descricao}</td>
                                    <td>{data.data[id].valor}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
