import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Logo from '../assets/kbase_logo.svg'
import api from '../services/api'
import { login } from '../services/auth'

import { Face, Fingerprint } from '@material-ui/icons'
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
    email: '',
    password: '',
    error: ''
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };
    render() {
        const { classes } = this.props;
        return (
          <div className={styled} onSubmit={this.handleSignIn}>
            <Paper className={classes.padding} >
              <img className={classes.logo} src={Logo} alt="logo"/>
                {this.state.error && <p>{this.state.error}</p>}
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
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
                        <Grid item>
                            <Fingerprint />
                        </Grid>
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
                              component={Link} to={"/signup"}
                              variant="text" color="primary"
                              >
                                Não tem conta? Registre-se
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