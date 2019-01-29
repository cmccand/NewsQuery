import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './index.module.scss';

class DropDown extends Component {
  state = {
    isOpen: false
  }

  toggleDropDown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  onSelect = (value) => {
    this.props.onSelect(value);
    this.setState({ isOpen: false });
  }

  renderOptions = () => (
    <>
      {
        this.props.options.map(
          (option, i) => (
            <li
              key={`option-${i}`}
              className={styles.option}
              onClick={() => this.onSelect(option.value)}
            >
              { option.title }
            </li>
          )
        )
      }
    </>
  )

  showDropDown = () => {
    if (this.state.isOpen) {
      return (
        <ul className={styles.options}>
          { this.renderOptions() }
        </ul>
      );
    }
  }

  renderDownArrow = () => (
    <div className={styles.downArrow} />
  )

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.selected} onClick={this.toggleDropDown}>
          <span>{ this.props.selected || 'Sort Articles' }</span>
          <span>{ this.renderDownArrow() }</span>
        </div>
        { this.showDropDown() }
      </div>
    );
  }
}

export default DropDown;

DropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired
};

DropDown.defaultProps = {
  selected: 'Filter'
};
