document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { name: 'Phone Case', category: 'phone', price: 10, image: 'images/_7f41a52f-d98f-49d0-882a-4f997d43c88a.jpeg', description: "Protective case for your phone" },
        { name: 'Laptop Stand', category: 'laptop', price: 25, image: 'product/_99d083ae-69b8-4f18-9804-7dac6fee05e1.jpeg', description: "Ergonomic stand for your laptop" },
        { name: 'Wireless Earbuds', category: 'audio', price: 30, image: 'product/_c4b4a4a5-95a2-4b9a-b46d-8113292bcb10.jpeg', description: "High-quality wireless earbuds" },
        { name: 'Headphones', category: 'audio', price: 30, image: 'product/_9467ca2a-415d-45bf-97cb-d0710e0b304e.jpeg', description: "Premium over-ear headphones" },
        { name: 'Lamp', category: 'desk', price: 30, image: 'product/_518224cf-aa24-4876-95a4-a432f2f3cdb9.jpeg', description: "Desk lamp with adjustable brightness" },
        { name: 'Laptop cover', category: 'laptop', price: 30, image: 'product/_98f2e233-fd33-4187-9d3f-b0c97443f85f.jpeg', description: "Stylish cover for your laptop" },
        { name: 'Phone charger', category: 'phone', price: 30, image: 'product/_fc40e4bf-0861-47e1-b361-b2c638dd10b9.jpeg', description: "Fast-charging phone charger" },
        { name: 'Laptop charger', category: 'laptop', price: 30, image: 'product/_09100373-03bb-47db-9bf6-656081026f49.jpeg', description: "Replacement charger for your laptop" }
    ];

    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category');
    const cartButton = document.getElementById('cart');
    const contactLink = document.getElementById('contact-link');
    const searchButton = document.getElementById('searchButton');

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        return productCard;
    }

    function filterProducts(category) {
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }

    function addToCart(name, price) {
        // You can implement your logic for adding products to the cart here
        // For demonstration purposes, let's just log the product name and price
        console.log(`Added ${name} to cart. Price: $${price}`);
    }

    // Event listener for category filter change
    categoryFilter.addEventListener('change', function () {
        const category = this.value;
        filterProducts(category);
    });

    // Event listener for smooth scrolling to contact section
    contactLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior of the link
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling to the contact section
    });

    // Event listener for adding products to the cart
    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addToCart(name, price);
        }
    });

    // Event listener for search button click
    searchButton.addEventListener('click', function () {
        search();
    });

    // Search function
    function search() {
        var query = document.getElementById("searchInput").value;
        const searchResults = products.filter(product => {
            return product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase());
        });
        displayProducts(searchResults);
    }

    // Initial display of products
    displayProducts(products);

});
class Slideshow {
    constructor(container) {
        this.slidesContainer = container;
        this.slides = this.slidesContainer.children;
        this.slideCount = this.slides.length;
        this.slideIndex = 0;
        this.prevButton = document.getElementById('prevButton');
        this.nextButton = document.getElementById('nextButton');

        this.nextButton.addEventListener('click', () => this.nextSlide());
        this.prevButton.addEventListener('click', () => this.prevSlide());
    }

    nextSlide() {
        this.slideIndex++;
        if (this.slideIndex >= this.slideCount) {
            this.slideIndex = 0;
        }
        this.updateSlide();
    }

    prevSlide() {
        this.slideIndex--;
        if (this.slideIndex < 0) {
            this.slideIndex = this.slideCount - 1;
        }
        this.updateSlide();
    }

    updateSlide() {
        this.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        this.slidesContainer.style.transform = `translateX(-${this.slideIndex * 100}%)`;
    }
}

// Initialize the slideshow
const slideshowContainer = document.querySelector('.slides-container');
const slideshow = new Slideshow(slideshowContainer);



