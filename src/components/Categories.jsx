import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  state = {
    categories: [],
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { inputChange } = this.props;
    return (
      <form className="categories">
        <h2>categorias</h2>
        { categories.map((category) => (
          <label
            className="radio"
            key={ category.id }
            htmlFor={ category.id }
            data-testid="category"
          >
            <input
              type="radio"
              id={ category.id }
              name="category"
              value={ category.id }
              onChange={ inputChange }
            />
            { category.name }
          </label>
        )) }
      </form>
    );
  }
}

Categories.propTypes = {
  inputChange: PropTypes.func,
}.isRequired;
