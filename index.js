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
                  <p class="card-title">${item.title.slice(0, 20)}</p>
                  <h5 class="card-text">Price: $.${item.price}</h5>
                  <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More Info</a>
                </div>
              </div>
            `;
            div.appendChild(card);
          });

         
          const moreInfoButtons = document.querySelectorAll('.btn-primary');
          moreInfoButtons.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                        const cardId = event.target.closest('.card').id;

    
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = `
                <h5>Product Title: ${data[index].title}</h5>
                <p>Product Description: ${data[index].description}</p>
                <p>Product Price: Rs.${data[index].price}</p>
              `;
            });
          });
        });
    });
}


const modalHtml = `
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- modal content will be displayed here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;


document.body.insertAdjacentHTML('beforeend', modalHtml);

document.getElementById('jew').addEventListener('click', function() {
  loadCategory('https:ucts/category/jewelery', 'jewel.html');
});

document.getElementById('men').addEventListener('click', function() {
  loadCategory("https:ucts/category/men's%20clothing", 'men.html');
});

document.getElementById('women').addEventListener('click', function() {
  loadCategory("https:ucts/category/women's%20clothing", 'women.html');
});

document.getElementById('ele').addEventListener('click', function() {
  loadCategory('https:ucts/category/electronics', 'ele.html');
});
document.getElementById('cart').addEventListener('click', function() {
  loadCategory('https:s', 'cart.html');
});

document.getElementById('home').addEventListener('click', function() {
  fetch('index.html')
    .then(response => response.text())
    .then(data => {
      document.body.innerHTML = data;
    });
});
