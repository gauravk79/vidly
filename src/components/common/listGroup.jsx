import React from 'react';

const ListGroup = ({selectedItem, items, onItemSelect, textProperty, valueProperty}) => {
    return (        
        <ul className="list-group">            
            {items.map((item) => <li key={item[valueProperty]} style={{cursor: 'pointer'}}  className={selectedItem === item ? "list-group-item active" : "list-group-item"} onClick={() => onItemSelect(item)}>{item[textProperty]}</li>)}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;