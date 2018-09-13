import React from "react"
import { Route, Switch } from "react-router-dom"

// user views
import UserList from "views/User/UserList"
import UserCreate from "views/User/UserCreate"

const UserRouter = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url + "/"} component={UserList} />
      <Route exact path={match.url + "/add"} component={UserCreate} />
      <Route exact path={match.url + "/edit/:id"} component={UserCreate} />
    </Switch>
  </div>
)

export default UserRouter
