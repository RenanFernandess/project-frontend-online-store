import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Products from '../components/Products';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();

    this.inputChange = this.inputChange.bind(this);
    this.buttonSearch = this.buttonSearch.bind(this);
    this.addInCart = this.addInCart.bind(this);

    this.state = {
      search: '',
      products: [],
      category: '',
    };
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'category') this.buttonSearch();
    });
  }

  addInCart({ target }) {
    const { products } = this.state;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const trueCart = (cart) || [];
    const product = products.find((pro) => pro.id === target.id);
    trueCart.push(product);
    localStorage.setItem('cart', JSON.stringify(trueCart));
  }

  async buttonSearch() {
    const { search, category } = this.state;
    const data = await getProductsFromCategoryAndQuery(category, search);
    this.setState({ products: data.results });
  }

  render() {
    const { search, products } = this.state;
    return (
      <section>
        <header className="main-header">
          <h1 className="title">MercaDão</h1>
          <div className="serch-form-cont">
            <div className="serch-form">
              <input
                className="search-input"
                name="search"
                data-testid="query-input"
                type="text"
                value={ search }
                onInput={ this.inputChange }
              />
              <button
                className="search-button"
                type="button"
                data-testid="query-button"
                onClick={ this.buttonSearch }
              >
                Pesquisar

              </button>
            </div>
            <p
              className="search-mensage"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </div>
          <nav>
            <Link
              className="button primary-button"
              data-testid="shopping-cart-button"
              to="/ShoppingCart"
            >
              Carrinho de compra
            </Link>
          </nav>
        </header>
        <main>
          <Categories
            inputChange={ this.inputChange }
          />
          <section className="products-container">
            { products.length !== 0
              ? (
                products.map((product) => {
                  const { price, title, thumbnail, id } = product;
                  return (
                    <div className="product" key={ id }>
                      <Products
                        name={ title }
                        price={ price }
                        image={ thumbnail.replace(/(I\.jpg){1}$/g, 'W.jpg') }
                        id={ id }
                      />
                      <button
                        className="button primary-button"
                        type="button"
                        id={ id }
                        data-testid="product-add-to-cart"
                        onClick={ this.addInCart }
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  );
                })) : <p className="result-mensage">Nenhum produto foi encontrado</p> }
          </section>
        </main>
      </section>
    );
  }
}
// texto;
