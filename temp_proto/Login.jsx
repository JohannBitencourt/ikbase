import React from 'react'
import Logo from '../assets/img/kbase_logo.svg'

/* Material imports */
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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

const useStyles = makeStyles(theme => ({
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
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={styled}>     
      <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
        <img className={classes.logo} src={Logo} alt="logo"/> 
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
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
                  <Link href="#" variant="body2" color='secondary'>
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
    </ThemeProvider>
  );
}