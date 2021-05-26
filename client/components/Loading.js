import React from 'react';
import styles from "./css/Loading.module.css";

import quotes from '../quotes';

const Loading = () => {
  const idx = Math.floor(Math.random() * (128 + 1));
  return (
    <div className={styles.loading}>
      <img src="/gif/loading_b.gif" size="cover" position="absolute" />
      <div className={styles.quote}>
        <center><span className={styles.span}>{quotes[idx]}</span></center>
      </div>
    </div>
  );
};

export default Loading;
