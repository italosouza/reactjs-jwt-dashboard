import React from "react"
import api from "services/api"
import { Link } from "react-router-dom"

// @material-ui/core components
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardHeader from "@material-ui/core/CardHeader"

import Button from "@material-ui/core/Button"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

// @material-ui/icons
import AddIcon from "@material-ui/icons/Add"

// Layout Style
import styles from "assets/jss/material/views/PageListStyle"

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      acl: {
        new: true,
        edit: true,
        view: false,
        delete: false
      }
    }
  }

  getConsultar() {
    api.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const rows = res.data
      this.setState({ rows })
    })
  }

  handleDelete(id) {
    api.delete(`/api/users/${id}`).then(() => {})
  }

  componentDidMount() {
    this.getConsultar()
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                ID
              </TableCell>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell component="th" scope="row">
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(UserList)
