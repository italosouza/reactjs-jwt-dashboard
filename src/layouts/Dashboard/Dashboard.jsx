import React from "react"
import { Switch, Route, Redirect, NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { logout } from "services/auth"

// @material-ui/core
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import ReportIcon from "@material-ui/icons/Report"

// Layout Styles
import styles from "assets/jss/material/views/DashboardLayoutStyle"

// Data
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData"

// nested rountes
import dashboardRoutes from "routes/dashboard"

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

// TODO: create a Sidebar component
class Dashboard extends React.Component {
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false
  }

  handleLogout = event => {
    event.preventDefault()
    logout()
    this.props.history.push("/login")
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect) return null

              return (
                <NavLink
                  to={prop.path}
                  className={classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </ListItem>
                </NavLink>
              )
            })}

            <ListItem button onClick={this.handleLogout}>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>

          {/*
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
          */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {switchRoutes}
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
