import React from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'

import MyHeader from './components/MyHeader'
import CrytoCurrency from './components/CrytoCurrency'
import WatchList from './components/WatchList'
import MyPagination from './components/MyPagination'

function App() {
  return (
    <Switch>
        <div>
            <MyHeader />
            <Route exact path="/" component={CrytoCurrency} />
            <Route exact path="/:page" component={CrytoCurrency}/>
            <Route exact path="/WatchList" component={WatchList}/>
            <MyPagination />
        </div>
    </Switch>
  )
}

export default App
