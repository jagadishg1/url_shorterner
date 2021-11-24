import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return (
        <button className="btn btn-success btn-block" onClick={props.onClick} >{props.title}</button>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;