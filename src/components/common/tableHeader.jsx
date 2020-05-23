import React, { Component } from 'react';

class TableHeader extends Component {

    raiseSort = (path) => {
        console.log(path, this.props.sortColumn);
        if (path ===undefined) return;
        let order = 'asc';
        if (this.props.sortColumn.path === path) {
            order = this.props.sortColumn.order === 'asc' ? 'desc' : 'asc';
        }
        this.props.onSort({ path, order });
    }

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;
        const sortIcon = sortColumn.order === 'asc' ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>;
        return sortColumn.path === column.path ? sortIcon : null;
    }

    render() {
        
        return (
            <thead>
                <tr>
                    {this.props.columns.map((col) => <th className="clickable" key={col.path || col.key} onClick={() => this.raiseSort(col.path)} scope="col">{col.label} {this.renderSortIcon(col)}</th>)}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;