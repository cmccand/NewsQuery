import React from 'react';

// Styles
import styles from './index.module.scss';

const Preview = ({ article }) => (
  <div className={styles.container}>
    <div className={styles.imgContainer}>
      <img src={article.urlToImage} alt=""/>
    </div>
    <div className={styles.textContainer}>
      <h3 className={styles.headline}>{article.title}</h3>
      <p className={styles.description}>
        {article.description}
      </p>
      <button className={styles.button}>
        <a href={article.url} className={styles.link}>Read More</a>
      </button>
    </div>
  </div>
);

export default Preview;
