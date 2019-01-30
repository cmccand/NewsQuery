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
    articles: null,
    loading: false
  }

  componentDidMount() {
    const { q, sortBy } = this.props;
    if (q || sortBy) {
      this.fetchArticles(q);
    }
  }

  fetchArticles = debounce(async (q, filter) => {
    this.setState({ loading: true });
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
      this.setState({
        articles,
        loading: false
      });
      // this.storeArticles(articles);
    } catch (err) {
      this.setState({ loading: false });
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
    this.props.onChangeSortBy(filter);
    if (this.props.q) {
      if (filter) {
        this.fetchArticles(this.props.q, filter);
      }
    }
  }

  renderLoadingMessage = () => (
    <div className={styles.empty}>
      <p>Loading articles ...</p>
    </div>
  )

  renderArticles = () => {
    if (!this.state.articles) {
      return (
        <div className={styles.empty}>
          <p>Type above to being your search.</p>
        </div>
      );
    }
    if (this.state.articles && this.state.articles.length) {
      return (
        <div className={styles.articles}>
          {
            this.state.articles.map(
              (article, i) => (
                <Preview article={article} key={`article-${i}`} />
              )
            )
          }
        </div>
      );
    }
    return (
      <div className={styles.empty}>
        <p>No results. Please try another search.</p>
      </div>
    );
  }

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
      <div className={styles.articleContainer}>
          { this.state.loading ? this.renderLoadingMessage() : this.renderArticles() }
        </div>
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
