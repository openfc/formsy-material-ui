import React from 'react';

const styles = {
  errorTool: {
    background: '#F44336',
    borderRadius: '5px',
    color: 'white',
    margin: '0 auto',
    padding: '10px',
    position: 'absolute',
    right: '-123px',
    transform: 'translateY(-50%)',
    width: '181px',
  },
  ug: {
    border: '10px solid transparent',
    borderRight: '10px solid #F44336',
    content: '',
    display: 'block',
    left: '-19px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

function ErrorTooltip(props) {
  const mergedStyles = Object.assign(
    {},
    styles.errorTool,
    props.style,
  );
  return (
    <div style={mergedStyles}>
      <div style={styles.ug} />
      {props.children}
    </div>
  );
}

ErrorTooltip.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

export default ErrorTooltip;
