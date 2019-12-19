import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Main from './components/Main'
import NewPost from './components/NewPost'
import NavbarHeader from './components/NavbarHeader'
import NotFound from './components/alert/NotFound'
import { isAuthenticated } from './services/auth'
import PostDetail from './containers/PostDetail'

import SignUp from './components/SignUp'

import { 
 Route, 
 Switch, 
 Redirect,
 BrowserRouter 
} from 'react-router-dom'

const drawerWidth = 240;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
  state = {
    open: false,
  };

  onChangeDrawer = (status) => {
    this.setState({
      open: status
    });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <NavbarHeader onChangeDrawer={this.onChangeDrawer} />
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="" exact component={SignUp} />
                <PrivateRoute path="/perfil" exact component={NewPost} />
                <PrivateRoute path="/post/novo" exact component={NewPost} />
                <PrivateRoute path="/:category" exact component={props => <Main {...props} />} />
                <PrivateRoute path="/:category/:id" exact component={props => <PostDetail {...props} />} />
                <Route path="*" component={NotFound} />
            </Switch>
            </main>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
});

export default withStyles(styles)(App);
