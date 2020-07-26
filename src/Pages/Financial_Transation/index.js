import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Redirect } from 'react-router-dom'
import { useApiTransaction } from '../../API'
import InfoMonth from './infoMonth'
import AddTransaction from './addTransaction'

export default function FinancialTransation({ match }) {
    const { transactions, newTransaction, removeTransaction } = useApiTransaction(match.params.month)

    const onCLick = async (data) => {
        await newTransaction(data)
        await transactions.refetch()
    }
    const handleRemove = async (id) => {
        await removeTransaction(`movimentacoes/${match.params.month}/${id}`)
        await transactions.refetch()
    }
    if (transactions.error && transactions.error === 'Permission denied') {
        return <Redirect to='/login' />
    }
    return (
        <div className='container body'>
            <Sidebar />
            <h1>Movimentações</h1>
            <InfoMonth month={match.params.month} />
            {transactions.loading ? <span>Loading...</span> :
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            transactions.data &&
                            Object.keys(transactions.data).map((id, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{transactions.data[id].description}</td>
                                        <td>
                                            {transactions.data[id].value}
                                            <button className='btn btn-danger ml-2' onClick={() => handleRemove(id)}>-</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <AddTransaction onCLicky={onCLick}/>
                        
                    </tbody>
                </table>
            }
        </div>
    )
}
