import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Favorite from '@material-ui/icons/Favorite'
import Home from '@material-ui/icons/Home'
import Share from '@material-ui/icons/Share'
import School from '@material-ui/icons/School'
import Person from '@material-ui/icons/Person'
import { Link } from 'react-router-dom'
import _ from 'lodash';

import { capitalize } from '../helpers/capitalize'

class Categories extends Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  renderIcon = (key) => {
    switch (key) {
      case 'desenvolvimento':
        return <Favorite />
      case 'análise':
        return <Share />
      case 'outros tópicos':
        return <School />
      default:
        return <Home />
    }
  }

  render() {
    const { categories, fetchCategoryPosts } = this.props;

    if (categories) {
      return (
        <List>
        <Link to="/"
              style={linkStyle}>
          <ListItem>
            <ListItemIcon>{this.renderIcon('inicio')}</ListItemIcon>
              <ListItemText primary="Início" />
          </ListItem>
        </Link>
        <Link to="/perfil"
              style={linkStyle}>
          <ListItem>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
              <ListItemText primary="Perfil" />
          </ListItem>
        </Link>
        {_.map(categories, category => {
          return (
            <Link to={`/${category.path}`}
              onClick={() => fetchCategoryPosts(category.path)}
              style={linkStyle}
              key={category.path}>
              <ListItem button>
                <ListItemIcon>{this.renderIcon(category.name)}</ListItemIcon>
                <ListItemText primary={capitalize(category.name)} />
              </ListItem>
            </Link>
          )
        })}
        </List>
      );
    }
    return (
      <div>Componente carregando...</div>
    );
  }
}

const linkStyle = {
  paddingLeft: 10,
  textDecoration: 'none'
}

export default Categories;
