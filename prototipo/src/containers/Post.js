import { connect } from 'react-redux'
import Post from '../components/Post'
import {
    voteForPost,
    fetchCommentsCount,
} from '../actions'

function mapStateToProps (state, ownProps) {
  return {}
}

export default connect(mapStateToProps, {
  voteForPost,
  fetchCommentsCount
})(Post)
