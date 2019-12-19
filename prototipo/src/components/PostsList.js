import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import _ from 'lodash'
import PostContainer from '../containers/Post'
import { Link } from 'react-router-dom'
import Custom from './alert/Custom'
import { styledColors } from '../helpers/styled'
import { 
 withStyles, 
 MuiThemeProvider, 
} from '@material-ui/core/styles'

const GoToNewPost = props => <Link to="/post/novo" {...props} />

class PostsList extends Component {
  componentWillMount() {
    if (this.props.match.params.category) {
      const {
        fetchCategoryPosts,
        match: { params: { category } } } = this.props;
        fetchCategoryPosts(category.toLowerCase());
      } else {
        this.props.fetchPosts();
      }
    }

    renderPosts() {
      const { classes, posts, deletePost } = this.props;

      if (posts.length > 0) {
        const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse();
        return (
          _.map(orderedPosts, post => <Grid key={post.id} item xs={6}>
            <PostContainer
            key={post.id}
            post={post}
            onDeletePost={deletePost}
          />
          </Grid>
          )
        );
      }
      return (
        <div className={classes.root}>
          <Custom
            variant={'warning'}
            message={'Nenhum post foi encontrado!'}
          />
        </div>
      )
    }

    render(){
      const { classes, postsOrder, postSortOrder } = this.props;

      return(
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Select
                  className={classes.select}
                  value={postsOrder}
                  color="secundary "
                  onChange={event => {
                    postSortOrder(event.target.value)
                    this.setState({ seleted: event.target.value })
                  }}
                >
                <MenuItem value="voteScore">Votos</MenuItem>
                <MenuItem value="timestamp">Data</MenuItem>
              </Select>
              <MuiThemeProvider 
                theme={styledColors} 
                className={classes.button}>
                  <Button
                    component={GoToNewPost}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                  Novo Post
                  </Button>
                </MuiThemeProvider>
            </Paper>
          </Grid>
            {this.renderPosts()}
        </Grid>        
        </div>
      );
    }
  }

const styles = theme => ({
    root: {
      marginTop: 50,
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'right',
      height: 55,
      color: theme.palette.text.secondary,
    },
    select: {
      width: 100,
      borderRadius: 2,
      margin: theme.spacing.unit,
      backgroundColor: '#dcdcdc',
    },
    button: {
      marginLeft: 'auto',
      marginRight: 100
    }
});

PostsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsList);
