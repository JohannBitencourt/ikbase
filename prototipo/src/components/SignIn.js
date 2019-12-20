import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Logo from '../assets/kbase_logo.svg'
import api from '../services/api'
import { login } from '../services/auth'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { Box, Container} from '@material-ui/core/styles'

import { 
 makeStyles, 
 createMuiTheme, 
 ThemeProvider
} from '@material-ui/core/styles'

const styled = createMuiTheme({
  root: {
    backgroundColor: '#000',
  },
  palette: {
    primary: {
      main: '#ffb74d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#757575',
      contrastText: '#fff',
    },
  },
});

const styles = theme => ({
    logo: {
        marginTop: theme.spacing(5),
    },
    card: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        width: '100%',
        margin: theme.spacing(3, 0, 3),
    },
});

class SignIn extends Component {
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

    <ThemeProvider theme={styled}>
    <div onSubmit={this.handleSignIn}>
    <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
        <img src={Logo} alt="kbase_logo" />
        <div className={classes.paper}>
        <form className={classes.form} noValidate>
        {this.state.error && <p>{this.state.error}</p>}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => this.setState({ email: e.target.value })}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            onChange={e => this.setState({ password: e.target.value })}
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar senha"
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            className={classes.submit}
        >
        Entrar
        </Button>
        <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color='secondary'>
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" color='secondary'>
                    {"Não possui conta? Registre-se"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={4}>
          </Box>
        </Card>
      </Container>
    </div>
    </ThemeProvider>
    );
  }
}

export default withRouter(SignIn)(styles);