import React from 'react';
import Rest from './Rest'


const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const {useGet,usePost,useRemove} = Rest(baseURL)


function App() {

  const data = useGet('movimentacoes/2020-02')
  const [postData,post] = usePost('movimentacoes/2020-02')
  const [removeData,remove] = useRemove()
  

  const newPost = ()=>{
    post({valor:900, descricao:'Curso ReactJS'})  
  }

  const removePost =()=>{
    remove('movimentacoes/2020-02/-MCMOSqa3JlPQdbtl9kA')
  }

  return (
    <div >
      <h1>My money</h1>
      <pre>{data.loading?<p>Loading...</p>:JSON.stringify(data)}</pre>
      <button onClick={newPost}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={removePost}>Delete</button>
      <pre>{JSON.stringify(removeData)}</pre>
    </div>
  );
}

export default App;
