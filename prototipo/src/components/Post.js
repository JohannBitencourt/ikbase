import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Comment from '@material-ui/icons/Comment'
import Star from '@material-ui/icons/Star'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import { currentDate } from '../helpers/currentDate'
import { capitalize } from '../helpers/capitalize'
import { styledColors } from '../helpers/styled'
import { 
  withStyles, 
  MuiThemeProvider, 
 } from '@material-ui/core/styles'

class Post extends React.Component {

  state = { _commentCount: 0 }

  componentWillMount() {
    const { post } = this.props;
    this.props.fetchCommentsCount(post.id, (data) => { this.setState({ _commentCount: data.amount }); });
  }

  render() {
    const { classes, post, onDeletePost, commentCount, voteForPost,
      match: { params: { id } } } = this.props;
      
    return (
      <MuiThemeProvider theme={styledColors}>
        <Card className={classes.card}>
          <CardHeader
            title={id ? `${post.title}` : <Link to={`${post.category}/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>{post.title}</Link>}
            subheader={`Postado por ${post.author} - ${currentDate(post.timestamp)}`}
          />

          { post.body.length > 0 &&(
            <CardContent>
              <Typography component="p">
                <b>{`( ${capitalize(post.category)} )`}</b> {post.body}
              </Typography>
            </CardContent>
          )}

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Vote Score">
              <Badge badgeContent={post.voteScore} color="secondary" classes={{ badge: classes.badge }}>
                <Star />
              </Badge>
            </IconButton>

            <IconButton
              component={Link} to={`/${post.category}/${post.id}`}>
              <Badge badgeContent={commentCount ? commentCount : this.state._commentCount} color="secondary" classes={{ badge: classes.badge }}>
                <Comment />
              </Badge>
            </IconButton>

            <IconButton onClick={() => voteForPost(post.id, 'upVote') }>
              <ThumbUpAlt />
            </IconButton>

            <IconButton onClick={() => voteForPost(post.id, 'downVote')}>
              <ThumbDownAlt />
            </IconButton>

            <Grid className={classes.actionsRight}>
              <IconButton
                onClick={() =>
                  onDeletePost(post.id, () => { this.props.history.push('/') } )}
                style={{ backgroundColor: 'transparent' }}
              >
                  <Grid item xs={8}>
                    <DeleteIcon className={classes.icon} />
                  </Grid>
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: '100%',
    backgroundColor: '#fffde6'
  },
  actions: {
    display: 'flex',
  },
  actionsRight: {
    marginLeft: 'auto',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Post));
