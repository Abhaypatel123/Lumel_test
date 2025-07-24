export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const calculateHierarchyValues = (data) => {
  return data.map((item) => {
    if (item.children) {
      const children = calculateHierarchyValues(item.children);
      const value = children.reduce((sum, c) => sum + c.value, 0);
      return { ...item, value, children };
    }
    return item;
  });
};

export const getGrandTotal = (data) =>
  data.reduce((sum, item) => sum + item.value, 0);
