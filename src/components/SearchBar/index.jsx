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
  onChange = ({ target: { value }}) => {
    this.props.onChangeSearch(value);
  }

  getFilterTitle = filter => {
    const option = dropDownOptions.find(option => option.value === filter);
    return option.title;
  }

  render() {
    const { currentSearch, currentFilter, onChangeFilter } = this.props;
    return (
      <div className={styles.container}>
        <input
         className={styles.input}
         type="text"
         placeholder="Type search here"
         value={ currentSearch || '' }
         onChange={this.onChange}
        />
        <DropDown
          selected={currentFilter ? this.getFilterTitle(currentFilter) : null }
          onSelect={onChangeFilter}
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
