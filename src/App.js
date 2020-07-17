import React from 'react';
import UseGet from './useGet'
import UsePost from './usePost'
import UseRemove from './useRemove'
import Axios from 'axios';

const URL = 'https://mymoney-e344c.firebaseio.com/movimentacoes/2020-02.json'

function App() {

  const data = UseGet(URL)
  const [postData,post] = UsePost(URL)
  const [removeData,remove] = UseRemove()
  

  const newPost = ()=>{
    post({valor:900, descricao:'Curso ReactJS'})  
  }

  const removePost =()=>{
    remove('https://mymoney-e344c.firebaseio.com/movimentacoes/2020-02/-MCOb09Fgm_bSWfsNzk3.json')
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
