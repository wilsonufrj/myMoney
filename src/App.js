import React from 'react';
import DataGet from './dataGet'

const URL = 'https://mymoney-e344c.firebaseio.com/movimentacoes/2020-02.json'

function App() {

  const data = DataGet(URL)

  return (
    <div >
      <h1>My money</h1>
      <pre>{data.loading?<p>Loading...</p>:JSON.stringify(data)}</pre>
    </div>
  );
}

export default App;
