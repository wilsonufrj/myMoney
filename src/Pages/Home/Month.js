import React from 'react'
import Rest from '../../utils/Rest'
import {Link} from 'react-router-dom'

const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet } = Rest(baseURL)

export default function Month() {
  const data = useGet('meses')

  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Previsão Entrada</th>
            <th>Entrada</th>
            <th>Previsão Saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {
              Object.keys(data.data).map(mes => {
                return (
                  <tr key={mes}>
                    <td><Link to={`movimentacoes/${mes}`}>{mes}</Link></td>
                    <td>{data.data[mes].previsao_entrada}</td>
                    <td>{data.data[mes].entrada}</td>
                    <td>{data.data[mes].previsao_saida}</td>
                    <td>{data.data[mes].saida}</td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
}
