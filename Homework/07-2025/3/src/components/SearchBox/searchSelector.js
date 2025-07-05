export const searchProductSelector = (products, keyword) => {
    const kw = keyword.toLowerCase();
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(kw) ||
            p.id.toLowerCase().includes(kw)
    );
};
