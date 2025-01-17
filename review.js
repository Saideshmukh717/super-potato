// review.js

document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviews');

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        // You can perform further actions here, such as storing the review in a database,
        // displaying it on the page, etc.

        // For demonstration, let's simply display the review below the form.
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `<strong>${name}</strong> - Rating: ${rating}<br>${comment}<hr>`;
        reviewsContainer.appendChild(reviewElement);

        // Reset form fields
        reviewForm.reset();
    });
});
