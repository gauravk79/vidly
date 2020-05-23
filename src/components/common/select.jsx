import React from 'react';

const Select = ({ name, label, error, onChange, options, value }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange} className="form-control">
                <option value="" />                
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>

    );
}

export default Select;