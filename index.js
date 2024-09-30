let div = document.getElementById('c1');

function loadCategory(categoryUrl, htmlUrl) {
  fetch(categoryUrl)
    .then(response => response.json())
    .then(data => {
      fetch(htmlUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          div.innerHTML = '';
          div.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-4');

          data.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('col');
            card.innerHTML = `
              <div class="card h-100" id="card-${index}">
                <img src="${item.image}" class="card-img-top" alt="${item.title}" onerror="this.style.display='none'">
                <div class="card-body">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-index="${index}">More Info</button>
                </div>
              </div>
            `;
            div.appendChild(card);
          });

          const modalHtml = `
            <
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Add to cart</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          `;

          document.body.insertAdjacentHTML('beforeend', modalHtml);

          const buttons = document.querySelectorAll('.btn-primary');
          buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
              const index = event.target.getAttribute('data-index');
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = `
                <img src="${data[index].image}" class="card-img-top" alt="${data[index].title}" onerror="this.style.display='none'">
                <h5>Product Title: ${data[index].title}</h5>
                <p>Product Description: ${data[index].description}</p>
                <p>Product Price: $.${data[index].price}</p>
              `;
            });
          });
        });
    });
}

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