let div = document.getElementById('c1');

// Function to dynamically load cards based on the data length
function loadCategory(categoryUrl, htmlUrl) {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            fetch(htmlUrl)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // Clear previous content and add Bootstrap grid classes
                    div.innerHTML = '';
                    div.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-4');

                    // Dynamically create cards based on the length of the data
                    data.forEach((item, index) => {
                        const card = document.createElement('div');
                        card.classList.add('col');
                        card.innerHTML = `
                            <div class="card h-100">
                                <img src="${item.image}" class="card-img-top" alt="${item.title}" onerror="this.style.display='none'">
                                <div class="card-body">
                                    <p class="card-title">${item.title.slice(0, 20)}</p>
                                    <h5 class="card-text">Price: Rs.${item.price}</h5>
                                    <a href="#" class="btn btn-primary">Add to Cart</a>
                                </div>
                            </div>
                        `;
                        div.appendChild(card);
                    });
                });
        });
}

// Event Listeners for Categories
document.getElementById('jew').addEventListener('click', function() {
    loadCategory('https://fakestoreapi.com/products/category/jewelery', 'jewel.html');
});

document.getElementById('men').addEventListener('click', function() {
    loadCategory("https://fakestoreapi.com/products/category/men's%20clothing", 'men.html');
});

document.getElementById('women').addEventListener('click', function() {
    loadCategory("https://fakestoreapi.com/products/category/women's%20clothing", 'women.html');
});

document.getElementById('ele').addEventListener('click', function() {
    loadCategory('https://fakestoreapi.com/products/category/electronics', 'ele.html');
});
document.getElementById('cart').addEventListener('click', function() {
    loadCategory('https://fakestoreapi.com/carts', 'cart.html');
});

document.getElementById('home').addEventListener('click', function() {
    fetch('index.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data;
        });
});
