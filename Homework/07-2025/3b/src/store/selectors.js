export const selectProducts = (state) => state.products;
export const selectSearchStr = (state) => state.searchStr;

export const selectFilteredProducts = (state) => {
    const keyword = state.searchStr.toLowerCase();
    return state.products.filter(
        (p) =>
            p.name.toLowerCase().includes(keyword) ||
            p.id.toLowerCase().includes(keyword)
    );
};
