import React from "react";

const ProgressBar = ({ progress }) => {

  const containerStyles = {
    position: 'fixed',
    top: '48%',
    left: '20%',
    height: '4%',
    width: '60%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    zIndex: '999999999'
  }

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: 'red',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;