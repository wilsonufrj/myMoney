import React from 'react';
import Rest from './Rest'

const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const {useGet,usePost,useRemove} = Rest(baseURL)

function App() {

  const data = useGet('meses')

  //const [postData,post] = usePost('movimentacoes/2020-02')
  //const [removeData,remove] = useRemove()
  

  /*const newPost = ()=>{
    //post({valor:900, descricao:'Curso ReactJS'})  
  }

  const removePost =()=>{
    //remove('movimentacoes/2020-02/-MCMOSqa3JlPQdbtl9kA')
  } */

  return (
    <div >
        <nav className='navbar navbar-light bg-light'>
          <div className='container'>
            <a className='navbar-brand'>My money</a>
          </div>
        </nav>

        <div className='container'>
          <select>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
          </select>

          <select>
            <option value='07'>07</option>
            <option value='08'>08</option>
          </select>
          <button className='ml-1'>Adicionar Mês</button>
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
                  Object.keys(data.data).map(mes=>{
                    return (
                      <tr key= {mes}>
                        <td>{mes}</td>
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
          {
            data.loading? <p>Loading...</p> : JSON.stringify(data)
          }
        </div>

    </div>
  );
}

export default App;
