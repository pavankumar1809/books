import React from 'react'
import CrudApp from './CrudApp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Update from './Update'

function App() {
    
    
    return (
        <Router>
        <Switch>
            <Route exact path='/'><CrudApp/></Route>
            <Route path='/update/:id'><Update/></Route>
        </Switch>
        </Router>
    )
}

export default App
