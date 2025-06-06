const apiUrl = 'https://fakestoreapi.com/products';

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Lỗi khi fetch sản phẩm:', error);
    }
}

function renderProducts(products) {
    const container = document.getElementById('productList');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;

        const title = document.createElement('h3');
        title.textContent = product.title;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = `$${product.price}`;

        const desc = document.createElement('p');
        desc.className = 'description';
        desc.textContent = product.description;

        const category = document.createElement('p');
        category.className = 'category';
        category.textContent = `Category: ${product.category}`;

        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.innerHTML = `⭐ ${product.rating.rate} (${product.rating.count} reviews)`;

        // Gắn các phần tử vào thẻ card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(category);
        card.appendChild(rating);

        // Gắn card vào danh sách
        container.appendChild(card);
    });
}

// Gọi API khi trang load
fetchProducts();
