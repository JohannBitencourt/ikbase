import { connect } from 'react-redux'
import Categories from '../components/Categories'
import {
  fetchCategories,
  fetchCategoryPosts
} from '../actions'

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCategoryPosts
})(Categories);
