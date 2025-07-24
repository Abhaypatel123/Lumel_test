'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateValue } from '../redux/slices/allocationSlice';
import "./allocationtable.css";

const TableRow = ({ row, level = 0 }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const originalValue = useSelector((state) => state.allocation.originalValues[row.id]);
    const variance = originalValue ? ((row.value - originalValue) / originalValue) * 100 : 0;

    const handlePercent = () => {
        const percent = parseFloat(input);
        if (!isNaN(percent)) {
            const updatedValue = Math.round(row.value * (1 + percent / 100));
            dispatch(updateValue({ id: row.id, newValue: updatedValue }));
        }
    };

    const handleAbsolute = () => {
        const value = parseFloat(input);
        if (!isNaN(value)) {
            dispatch(updateValue({ id: row.id, newValue: value }));
        }
    };

    return (
        <>
            <tr>
                <td
                >{level > 0 ? "--" : ""} {row.label}</td>
                <td>
                    {row.value}
                </td>
                <td>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '60px', marginRight: '6px' }}
                    />
                </td>
                <td>
                    <button onClick={handlePercent}>Allocation %</button>
                </td>
                <td>
                    <button onClick={handleAbsolute}>Allocation Val</button>
                </td>
                <td>
                    {variance.toFixed(2)}%
                </td>
            </tr>
            {row.children &&
                row.children.map((child) => (
                    <TableRow key={child.id} row={child} level={level + 1} />
                ))}
        </>
    );
};

export default TableRow;
