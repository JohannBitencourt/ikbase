import { connect } from 'react-redux'
import CommentsList from '../components/CommentsList'
import _ from 'lodash'
import {
  fetchComments,
  createComment,
  deleteComment,
} from '../actions'

function mapStateToProps(state) {
  const comments = _.filter(state.comments, comment => !comment.deleted)
  return {
    comments
  }
}

export default connect(mapStateToProps, {
  fetchComments,
  createComment,
  deleteComment,
})(CommentsList);
