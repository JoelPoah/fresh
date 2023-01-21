import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'


// Pages
import Transaction1 from "./Pages/Transaction/Transaction1"
import Transaction2 from "./Pages/Transaction/Transaction2"
import Transaction3 from './Pages/Transaction/Transaction3';
import Transaction4 from './Pages/Transaction/Transaction4';
import Account from './Pages/Account/Account';
import Catalog from './Pages/Catalog/Catalog';
import Error from './Pages/Error/Error';

function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
          <Route exact path="/" element={<Catalog />} />
            {/* <Route exact path="/home" element={<Home />} /> */}
            <Route exact path="/checkout/1" element={<Transaction1 />} />
            <Route exact path="/checkout/2" element={<Transaction2 />} />
            <Route exact path="/checkout/3" element={<Transaction3 />} />
            <Route exact path="/checkout/4" element={<Transaction4 />} />
            <Route exact path="/catalog" element={<Catalog />} />
            <Route exact path="/account" element={<Account />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  )
}

export default App
