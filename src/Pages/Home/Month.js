import React from 'react'
import Rest from '../../utils/Rest'
import {Link,Redirect} from 'react-router-dom'


import Loading from '../../components/Loading'

const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet,useRemove } = Rest(baseURL)

export default function Month() {
  const data = useGet('meses')
  const [,remove]=useRemove()
  const handleClick = (evt)=>{
    remove('meses/'+evt.target.value)
    remove('movimentacoes/'+evt.target.value)
    data.refetch()
  }

  if(data.error && data.error==='Permission denied'){
    return <Redirect to='/login'/>
}
  return (
    <div className='container'>
      {data.loading?
        <Loading/> :
        <table className='table'>
          <thead>
            <tr>
              <th>Ano</th>
              <th>Previsão Entrada</th>
              <th>Entrada</th>
              <th>Previsão Saída</th>
              <th>Saída</th>
              <th>Delete</th>
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
                      <td><button value={mes} className='btn btn-danger' onClick={handleClick}>-</button></td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      }
    </div>
  )
}
