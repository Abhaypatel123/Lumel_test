'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { getGrandTotal } from '../utils/helpers';
import "./allocationtable.css";

const columns = ['Label', 'Value', 'Input', 'Allocation %', 'Allocation Val', 'Variance %'];

const AllocationTable = () => {
    const rows = useSelector((state) => state.allocation.rows);
    const total = getGrandTotal(rows);

    return (
        <div>
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <TableRow key={row.id} row={row} />
                        ))}
                        <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f4ff' }}>
                            <td>Grand Total</td>
                            <td>{total}</td>
                            <td colSpan="4"></td>
                        </tr>
                    </tbody>

                </table>
            </div>



        </div>
    );
};

export default AllocationTable;
