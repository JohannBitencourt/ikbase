import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Logo from '../assets/kbase_logo.svg'
import api from '../services/api'

import { styled } from '../helpers/styled'
import { 
 Paper,
 withStyles, 
 Grid, 
 TextField, 
 Button, 
 FormControlLabel, 
 Checkbox
} from '@material-ui/core'

const styles = theme => ({
    logo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing.unit * 2,
    },
    padding: {
      padding: theme.spacing.unit * 10,
      marginTop: 75,
      flexGrow: 1,
    }
});

class SignIn extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: ''
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
      }
    }
  };


    render() {
        const { classes } = this.props;
        return (
          <div className={styled} onSubmit={this.handleSignUp}>
            <Paper className={classes.padding} >
              <img className={classes.logo} src={Logo} alt="logo"/>
              {this.state.error && <p>{this.state.error}</p>}
                <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                      <TextField 
                        id="username" 
                        label="Nome" 
                        type="username"
                        color="primary"
                        onChange={e => this.setState({ username: e.target.value })}
                        fullWidth 
                        autoFocus required />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField 
                          id="email" 
                          label="Endereço de email" 
                          type="email"
                          color="primary"
                          onChange={e => this.setState({ email: e.target.value })}
                          fullWidth 
                          autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField 
                        id="password" 
                        label="Senha" 
                        type="password"
                        onChange={e => this.setState({ password: e.target.value })}
                        fullWidth required />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Lembrar" />
                    </Grid>
                    <Grid item>
                        <Button 
                          disableFocusRipple 
                          disableRipple 
                          style={{ textTransform: "none" }} 
                          component={Link} to={"/login"}
                          variant="text" color="primary"
                          >
                            Fazer login
                        </Button>
                    </Grid>
                    </Grid>
                    <Grid 
                      container 
                      justify="center" 
                      style={{ marginTop: '10px' }}
                    >
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        type="submit"
                        style={{ textTransform: "none" }}
                        >
                        Entrar
                      </Button>
                    </Grid>
                </div>
            </Paper>
          </div>
        );
    }
}

export default withRouter(withStyles(styles)(SignIn));