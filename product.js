document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { name: 'Game board elite', category: 'motherboard', price: 190, image: 'hardware/a gaming motherboard stand in white background.png', description: "ultimate performace with high durability", link:'phone.html' },
        { name: 'Neo Radeon 9800X', category: 'GPU', price: 2500, image: 'hardware/a GPU with a neo red and black color scheme on a white background.png', description: "24gigs of gddr 6", link:'laptop stand.html' },
        { name: 'hyperion power x', category: 'PSU', price: 300, image: 'hardware/simple powersupply unit in matte black on a white background.png', description: "High-quality wireless earbuds", link:'wireless earbuds.html' },
        { name: 'Pre Builds', category: 'assmembled', price: 100, image: 'hardware/neon red and black empty PC cabinet.png', description: "Premium over-ear headphones", link:'headphones.html' },
        { name: 'RAM', category: 'parts', price: 30, image: 'hardware/a-photo-of-rgb-computer-ram-on-a-black-b_2qWlMIahTSWufXJ1qtUsiw_x0ThJ2enQzukMw9HV-4Zww.jpeg', description: "High performance RAM for your high performance tasks", link:'lamp.html' },
        { name: 'SSD', category: 'parts', price: 30, image: 'hardware/a-photo-of-a-premium-ssd-on-a-black-back_wS-5CibmQPGFeVjsD-z12Q_-rHnz-zkS4C4pBpd4i7_qA.jpeg', description: "high performance SSD for your high performace tasks", link:'laptop cover.html' },
        { name: 'Processors', category: 'CPU', price: 30, image: 'hardware/a-photo-of-a-premium-processor-on-a-blac_LLwjYZpzQO66pk8HyfYyEA_Ms79SUgdS9ijnsTwzmt6fg.jpeg', description: "You gotta need a high speed processor for your high perforance browsing", link:'phone charger.html' },
        { name: 'AIO cooler', category: 'parts', price: 30, image: 'hardware/a-photo-of-a-premium-aio-cooler-in-black_oTpE8OQRS2SfIToYcnyzPw_7jlEQGAfRc2WBi5eV4A06w.jpeg', description: "Gotta cool that down thar beast", link:'laptop charger.html' }
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
            <a href="${product.link}" class="product-link">View Details</a>
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
    // Define the slideshow logic
class Slideshow {
    constructor(container) {
        this.slidesContainer = container;
        this.slides = this.slidesContainer.children;
        this.slideCount = this.slides.length;
        this.slideIndex = 0;
        this.intervalTime = 2500; // Adjust interval time (in milliseconds) as needed
        this.slideInterval = null;
    }

    startSlideShow() {
        this.slideInterval = setInterval(() => this.nextSlide(), this.intervalTime);
    }

    nextSlide() {
        this.slideIndex++;
        this.updateSlide();
    }

    updateSlide() {
        this.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        this.slidesContainer.style.transform = `translateX(-${this.slideIndex * 100}%)`;

        if (this.slideIndex === this.slideCount) {
            setTimeout(() => {
                this.slidesContainer.style.transition = 'none';
                this.slideIndex = 0;
                this.slidesContainer.style.transform = `translateX(0%)`;
            }, 500);
        }
    }
}

// Initialize the slideshow
const slideshowContainer = document.querySelector('.slides-container');
const slideshow = new Slideshow(slideshowContainer);
window.addEventListener('load', () => slideshow.startSlideShow());


