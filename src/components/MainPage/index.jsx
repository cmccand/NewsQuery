import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import SearchBar from '../SearchBar';
import Preview from '../Preview';

// Third-party
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

// Utilities
import { debounce } from '../../utils/Debounce';

// styles
import styles from './index.module.scss';

const searchUrl = 'https://newsapi.org/v2/everything';
const urlPropsQueryConfig = {
  q: { type: UrlQueryParamTypes.string },
  sortBy: { type: UrlQueryParamTypes.string }
};

class MainPage extends Component {
  state = {
    articles: null
  }

  componentDidMount() {
    const { q, sortBy } = this.props;
    if (q || sortBy) {
      this.fetchArticles(q);
    }
  }

  fetchArticles = debounce(async (q, filter) => {
    try {
      let url = `${searchUrl}?q=${q}&language=en`;
      if (filter) { url = `${url}&sortBy=${filter}`; }
      const resp = await fetch(
        url,
        {
          withCredentials: true,
          headers: {
            'Authorization': process.env.REACT_APP_NEWS_API_KEY
          }
        }
      );
      const { articles } = await resp.json();
      this.storeArticles(articles);
    } catch (err) {
      throw err;
    }
  }, 500)

  onChangeSearch = q => {
    this.props.onChangeQ(q);
    if (q) {
      this.fetchArticles(q);
    }
  }

  onChangeFilter = filter => {
    if (this.props.q) {
      this.props.onChangeSortBy(filter);
      if (filter) {
        this.fetchArticles(this.props.q, filter);
      }
    }
  }

  storeArticles = articles => this.setState({ articles })

  renderArticles = () => (
    this.state.articles
      ? (
        <div className={styles.articles}>
          {
            this.state.articles.map(
              (article, i) => (
                <Preview article={article} key={`article-${i}`} />
              )
            )
          }
        </div>
      )
      : false
  )

  render() {
    return (
      <div className={styles.container}>
        <SearchBar
          currentSearch={this.props.q}
          currentFilter={this.props.sortBy}
          onChangeFilter={this.onChangeFilter}
          storeArticles={this.storeArticles}
          onChangeSearch={this.onChangeSearch}
        />
        { this.renderArticles() }
      </div>
    );
  }
}

MainPage.propTypes = {
  q: PropTypes.string,
  sortBy: PropTypes.string,
  onChangeQ: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired
};

MainPage.defaultProps = {
  q: null,
  sortBy: null
};

export default addUrlProps({ urlPropsQueryConfig })(MainPage);
