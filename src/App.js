import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Home from './Pages/Home';
import FinancialTransation from './Pages/Financial_Transation';

function App() {

  return (
    <Router>
      <div>
          <Route path='/' exact component={Home} />
          <Route path='/movimentacoes/:month' component={FinancialTransation} />
      </div>
    </Router>
  );
}

export default App;
