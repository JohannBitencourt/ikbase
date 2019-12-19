import { connect } from 'react-redux'
import PostsList from '../components/PostsList'
import _ from 'lodash'
import {
  fetchPosts,
  fetchCategoryPosts,
  postSortOrder,
  deletePost,
  fetchCommentsCount
} from '../actions'

function mapStateToProps (state) {
    const postsFiltered = _.filter(state.posts, post => !post.deleted);
    return {
      posts: postsFiltered,
      postsOrder: state.postsOrder
    }
  }

export default connect(
  mapStateToProps, {
    fetchPosts,
    fetchCategoryPosts,
    postSortOrder,
    deletePost,
    fetchCommentsCount,
  })(PostsList);
