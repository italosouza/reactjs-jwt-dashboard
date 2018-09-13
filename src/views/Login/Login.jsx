import React from "react"
import PropTypes from "prop-types"
import api from "services/api"
import { isAuthenticated, login } from "services/auth"

// @material-ui/core
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"

import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

// Layout Styles
import styles from "assets/jss/material/views/LoginStyles"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginData: {},
      mensagem: "",
      snackOpen: false
    }

    if (isAuthenticated()) {
      this.props.history.push("/")
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ mensagem: "" })

    // mock
    login("12345")
    this.props.history.push("/")
    return
    // end-mock

    api
      .post(`/api/login`, this.state.loginData)
      .then(res => {
        login(res.data.token)
        this.props.history.push("/")
      })
      .catch(err => {
        console.log(err)
        this.setState({
          mensagem: "Não foi possível realizar o login",
          snackOpen: true
        })
      })
  }

  handleChange = key => event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const loginData = { ...this.state.loginData, [name]: value }
    this.setState({ loginData: loginData })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    this.setState({ snackOpen: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.gridMiddle}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <form
                  onSubmit={this.handleSubmit}
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="required"
                          name="name"
                          label="Name"
                          className={classes.textField}
                          margin="normal"
                          onChange={this.handleChange()}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          id="password-input"
                          name="password"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          autoComplete="current-password"
                          margin="normal"
                          onChange={this.handleChange()}
                        />
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="primary"
                        size="large"
                        onClick={this.handleSubmit}
                      >
                        Login
                      </Button>
                    </CardActions>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.mensagem}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
