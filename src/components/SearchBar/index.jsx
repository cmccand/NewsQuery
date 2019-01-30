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
        <div className={styles.innerContainer}>
          <input
           className={styles.input}
           type="text"
           placeholder="Type search here"
           value={ currentSearch || '' }
           onChange={this.onChange}
          />
          <div className={styles.dropDownContainer}>
            <DropDown
              selected={currentFilter ? this.getFilterTitle(currentFilter) : null }
              onSelect={onChangeFilter}
              options={dropDownOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
