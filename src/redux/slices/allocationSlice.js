import { createSlice } from '@reduxjs/toolkit';
import { deepClone, calculateHierarchyValues } from '../../utils/helpers';

const initialRawData = [
    {
        id: 'electronics',
        label: 'Electronics',
        children: [
            { id: 'phones', label: 'Phones', value: 800 },
            { id: 'laptops', label: 'Laptops', value: 700 }
        ]
    },
    {
        id: 'furniture',
        label: 'Furniture',
        children: [
            { id: 'tables', label: 'Tables', value: 300 },
            { id: 'chairs', label: 'Chairs', value: 700 }
        ]
    }
];

const initialData = calculateHierarchyValues(deepClone(initialRawData));

const originalMap = {};
const buildMap = (nodes) => {
    nodes.forEach((n) => {
        originalMap[n.id] = n.value;
        if (n.children) buildMap(n.children);
    });
};
buildMap(initialData);

const allocationSlice = createSlice({
    name: 'allocation',
    initialState: {
        rows: initialData,
        originalValues: originalMap
    },
    reducers: {
        updateValue: (state, action) => {
            const { id, newValue } = action.payload;

            const update = (nodes) => {
                return nodes.map((node) => {
                    console.log("update.....",node,nodes,action,state)
                    if (node.id === id) {
                        if (node.children) {
                            const total = node.children.reduce((sum, c) => sum + c.value, 0);
                            const updatedChildren = node.children.map((child) => ({
                                ...child,
                                value: Math.round((child.value / total) * newValue)
                            }));
                            return {
                                ...node,
                                value: newValue,
                                children: updatedChildren
                            };
                        } else {
                            return { ...node, value: newValue };
                        }
                    } else if (node.children) {
                        const updatedChildren = update(node.children);
                        const updatedValue = updatedChildren.reduce((sum, c) => sum + c.value, 0);
                        return { ...node, children: updatedChildren, value: updatedValue };
                    }
                    return node;
                });
            };

            state.rows = update(deepClone(state.rows));
        }
    }
});

export const { updateValue } = allocationSlice.actions;
export default allocationSlice.reducer;
