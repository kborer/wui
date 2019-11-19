import React from 'react';
import PropTypes from 'prop-types';

function translateToUnits(value) {
  if (value === null) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return `${value}px`;
}

export default class DimensionLimiter extends React.Component {
  static propTypes = {
    centerH: PropTypes.bool,
    children: PropTypes.node.isRequired,
    v: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    v: null,
    h: null,
    centerH: false,
  };

  render() {
    const { h, v, centerH, children } = this.props;

    const style = {};
    const maxWidth = translateToUnits(h);
    const maxHeight = translateToUnits(v);

    if (maxWidth) {
      style.maxWidth = maxWidth;
    }

    if (maxHeight) {
      style.maxHeight = maxHeight;
    }

    if (centerH) {
      style.margin = '0 auto';
    }

    return React.Children.toArray(children)
      .filter(Boolean)
      .map(child => React.cloneElement(child, { style }));
  }
}
