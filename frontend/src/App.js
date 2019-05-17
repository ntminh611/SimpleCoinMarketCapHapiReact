import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MyHeader from './components/MyHeader'
import CrytoCurrency from './components/CrytoCurrency'
import WatchList from './components/WatchList'
import MyPagination from './components/MyPagination'

function App() {
  return (
    <div>
      <MyHeader />
      <Router>
        <Switch>
          <Route exact path="/" component={CrytoCurrency} />
          <Route exact path="/WatchList" component={WatchList} />
          <Route exact path="/:page" component={CrytoCurrency} />
        </Switch>
      </Router>
      <MyPagination />
    </div>
  )
}

export default App