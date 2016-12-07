import React from 'react';

import styles from './spinner.scss';

const Spinner = (props) => {
  let barStyle;
  const bars = [];

  for (let i = 0; i < 12; i++) {
    barStyle = {};
    barStyle.WebkitAnimationDelay = barStyle.animationDelay =
      `${(i - 12) / 10}s`;
    barStyle.WebkitTransform = barStyle.transform =
      `rotate(${(i * 30)}deg) translate(146%)`;
    bars.push(
      <div style={barStyle} className={styles['react-spinner_bar']} key={i} />,
    );
  }

  return (
    <div {...props} className={styles['react-spinner']}>
      {bars}
    </div>
  );
};

export {Spinner};
