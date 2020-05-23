import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ sortColumn, columns, onSort, data, idproperty }) => {
    return (
        <table className="table">
            <TableHeader
                sortColumn={sortColumn}
                columns={columns}
                onSort={onSort} />
            <TableBody data={data} columns={columns} idproperty={idproperty} />
        </table>
    );
}


export default Table;