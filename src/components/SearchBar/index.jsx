import React, { Component } from 'react';

// Components
import DropDown from '../DropDown';

// Styles
import styles from './index.module.scss';

const dropDownOptions = [
  {
    title: 'Popularity',
    value: 'popularity'
  },
  {
    title: 'Relevancy',
    value: 'relevancy'
  },
  {
    title: 'Date',
    value: 'publishedAt'
  }
];

class SearchBar extends Component {
  onChange = async ({ target: { value }}) => {
    this.props.onChangeSearch(value);
  }

  getFilterTitle = filter => {
    const option = dropDownOptions.find(option => option.value === filter);
    return option.title;
  }

  render() {
    return (
      <div className={styles.container}>
        <input
         className={styles.input}
         type="text"
         placeholder="Type search here"
         value={ this.props.currentSearch || '' }
         onChange={this.onChange}
        />
        <DropDown
          selected={this.getFilterTitle(this.props.currentFilter)}
          onSelect={this.props.onChangeFilter}
          options={dropDownOptions}
        />
        <button
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
