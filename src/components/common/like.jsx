import React from 'react';


const Like = ({ isLiked, onLike }) => {
    let classes = "fa fa-heart";
    if (!isLiked) classes += "-o";
    return (
        <i className={classes} style={{ cursor: 'pointer' }} aria-hidden="true" onClick={onLike} />
    );
}

export default Like;