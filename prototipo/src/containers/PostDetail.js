import { connect } from 'react-redux'
import PostDetail from '../components/PostDetail'
import {
  fetchPost,
  deletePost,
  createComment,
  fetchCommentsCount,
} from '../actions'

function mapStateToProps (state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id],
  }
}

export default connect(
  mapStateToProps, {
    fetchPost,
    deletePost,
    createComment,
    fetchCommentsCount,
  })(PostDetail);
