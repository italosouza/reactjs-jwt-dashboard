import React from "react"
import api from "services/api"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"

// Layout Styles
import styles from "assets/jss/material/views/PageCreateStyle"

class UserCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dados: {},
      mensagem: "",
      id: this.props.match.params.id,
      loading: false,
      success: false
    }
    this.getConsultar()
  }

  getConsultar() {
    if (this.state.id === undefined) {
      return
    }
    api.get(`/api/users/${this.state.id}`).then(res => {
      const dados = res.data
      this.setState({ dados, id: dados.id })
    })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const dados = { ...this.state.dados, [name]: value }
    this.setState({
      dados: dados,
      success: false,
      loading: false,
      failed: false
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      mensagem: "",
      success: false,
      loading: true,
      failed: false
    })

    this.state.id === undefined
      ? api
          .post(`/api/users`, this.state.dados)
          .then(res => {
            const dados = res.data
            this.setState({
              dados: dados,
              id: dados.id,
              loading: false,
              success: true
            })
          })
          .catch(() => {
            this.setState({
              mensagem: "Não foi possível realizar esta operação.",
              loading: false,
              success: false,
              failed: true
            })
          })
      : api
          .put(`/api/users/${this.state.id}`, this.state.dados)
          .then(() => {
            this.setState({
              loading: false,
              success: true
            })
          })
          .catch(() => {
            this.setState({
              mensagem: "Não foi possível realizar esta operação.",
              loading: false,
              success: false,
              failed: true
            })
          })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.map}>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardAvatar profile>
                <img src={avatar} alt="..." />
              </CardAvatar>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  {this.state.dados.username}
                </h4>
                <p className={classes.description}>{this.state.dados.email}</p>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Dados</h4>
                <p className={classes.cardCategoryWhite}>
                  Dados sobre o personagem selecionado
                </p>
              </CardHeader>

              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Nome</InputLabel>
                    <CustomInput
                      id="username"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        name: "username",
                        onChange: this.handleInputChange,
                        value: this.state.dados.username
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={5}>
                    <InputLabel>Email</InputLabel>
                    <CustomInput
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        name: "email",
                        type: "email",
                        onChange: this.handleInputChange,
                        value: this.state.dados.email
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <InputLabel>Senha</InputLabel>
                    <CustomInput
                      id="password"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        name: "password",
                        type: "password",
                        onChange: this.handleInputChange
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <SaveButton
          classes={classes}
          onClick={this.handleSubmit}
          {...this.state}
          routeName="/users"
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserCreate)
