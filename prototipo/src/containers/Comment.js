import { connect } from 'react-redux'
import Comment from '../components/Comment'
import _ from 'lodash'
import {
  fetchComments,
  deleteComment,
  voteForComment,
  fetchPost
} from '../actions'

function mapStateToProps(state) {
  const comments = _.filter(state.comments, comment => !comment.deleted)
  return {
    comments
  }
}

export default connect(mapStateToProps, {
  fetchComments,
  deleteComment,
  voteForComment,
  fetchPost
})(Comment);
