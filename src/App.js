import React from 'react';
import UseGet from './useGet'
import UsePost from './usePost'
import Axios from 'axios';

const URL = 'https://mymoney-e344c.firebaseio.com/movimentacoes/2020-02.json'

function App() {

  const data = UseGet(URL)
  const [postData,post] = UsePost(URL)
  

  const newPost = ()=>{
    post({valor:900, descricao:'Curso ReactJS'})  
  }

  return (
    <div >
      <h1>My money</h1>
      <pre>{data.loading?<p>Loading...</p>:JSON.stringify(data)}</pre>
      <button onClick={newPost}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
    </div>
  );
}

export default App;
