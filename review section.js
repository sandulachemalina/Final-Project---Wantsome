document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.getElementById('reviews-container');
    const paginationControls = document.getElementById('pagination-controls');
    let currentPage = 1;
    const reviewsPerPage = 5;

    async function fetchReviews() {
        try {
            const response = await fetch('review-section.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const bookReviews = data.review.find(book => book.bookId === bookId).review;
            displayReviews(bookReviews);
            setupPagination(bookReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    function getStarRating(rating) {
        const filledStarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.0292 4.02312C11.4833 3.32563 12.5167 3.32563 12.9708 4.02312L15.2972 7.59633C15.4534 7.83631 15.6953 8.00968 15.9749 8.08212L20.1385 9.16069C20.9512 9.37123 21.2705 10.3408 20.7385 10.9824L18.0127 14.2693C17.8296 14.4901 17.7372 14.7706 17.7538 15.0554L18.0006 19.2952C18.0488 20.1228 17.2128 20.722 16.4299 20.4211L12.4189 18.8793C12.1495 18.7757 11.8505 18.7757 11.5811 18.8793L7.57013 20.4211C6.78718 20.722 5.95118 20.1228 5.99936 19.2952L6.2462 15.0554C6.26277 14.7706 6.17039 14.4901 5.98732 14.2693L3.26155 10.9824C2.72948 10.3408 3.04881 9.37123 3.86153 9.16069L8.02508 8.08212C8.30471 8.00968 8.54659 7.83631 8.70283 7.59633L11.0292 4.02312Z" fill="#720076"/></svg>';
        const emptyStarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.8672 4.56873C11.8953 4.52558 11.939 4.5 12 4.5C12.061 4.5 12.1047 4.52558 12.1328 4.56873L14.4591 8.14194C14.7529 8.5931 15.2052 8.91574 15.7241 9.05017L19.8877 10.1287C20.0049 10.1591 20.0241 10.2772 19.9687 10.3441L17.2429 13.631C16.8992 14.0454 16.7241 14.5745 16.7555 15.1135L17.7538 15.0554L16.7555 15.1135L17.0023 19.3533C17.004 19.382 16.9984 19.4009 16.991 19.4158C16.9824 19.433 16.9673 19.4521 16.9444 19.4686C16.8992 19.5009 16.8461 19.5097 16.7887 19.4876L12.7777 17.9459C12.2773 17.7535 11.7227 17.7535 11.2223 17.9459L7.21134 19.4876C7.15388 19.5097 7.1008 19.5009 7.05565 19.4686C7.03275 19.4521 7.01758 19.433 7.00899 19.4158C7.00156 19.4009 6.996 19.382 6.99767 19.3533L7.24451 15.1135C7.27589 14.5745 7.10075 14.0454 6.75707 13.631L4.03131 10.3441C3.97586 10.2772 3.99508 10.1591 4.11231 10.1287L8.27585 9.05017C8.79476 8.91574 9.24713 8.5931 9.54087 8.14194L11.8672 4.56873Z" stroke="#720076" stroke-width="2"/></svg>';

        let stars = '';

        for (let i = 0; i < 5; i++) {
            stars += i < rating ? filledStarSvg : emptyStarSvg;
        }

        return stars;
    }


    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';
        const start = (currentPage - 1) * reviewsPerPage;
        const end = start + reviewsPerPage;
        const paginatedReviews = reviews.slice(start, end);

        const dislikeSvg = '<svg xmlns="http://www.w3.org/2000/svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path id="Vector" d="M7.49809 15.25H4.37227C3.34564 15.25 2.4267 14.556 2.31801 13.5351C2.27306 13.1129 2.25 12.6841 2.25 12.25C2.25 9.40238 3.24188 6.78642 4.899 4.72878C5.2866 4.24749 5.88581 4 6.50377 4L10.5198 4C11.0034 4 11.4839 4.07798 11.9428 4.23093L15.0572 5.26908C15.5161 5.42203 15.9966 5.5 16.4803 5.5L17.7745 5.5M7.49809 15.25C8.11638 15.25 8.48896 15.974 8.22337 16.5323C7.75956 17.5074 7.5 18.5984 7.5 19.75C7.5 20.9926 8.50736 22 9.75 22C10.1642 22 10.5 21.6642 10.5 21.25V20.6166C10.5 20.0441 10.6092 19.4769 10.8219 18.9454C11.1257 18.1857 11.7523 17.6144 12.4745 17.2298C13.5883 16.6366 14.5627 15.8162 15.3359 14.8303C15.8335 14.1958 16.5611 13.75 17.3674 13.75H17.7511M7.49809 15.25H9.7M17.7745 5.5C17.7851 5.55001 17.802 5.59962 17.8258 5.6478C18.4175 6.84708 18.75 8.19721 18.75 9.625C18.75 11.1117 18.3895 12.5143 17.7511 13.75M17.7745 5.5C17.6975 5.13534 17.9575 4.75 18.3493 4.75H19.2571C20.1458 4.75 20.9701 5.26802 21.2294 6.11804C21.5679 7.22737 21.75 8.40492 21.75 9.625C21.75 11.1775 21.4552 12.6611 20.9185 14.0229C20.6135 14.797 19.8327 15.25 19.0006 15.25H17.9479C17.476 15.25 17.2027 14.6941 17.4477 14.2907C17.5548 14.1144 17.6561 13.934 17.7511 13.75" stroke="#6F6F6F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg >';
        const likeSvg = '<svg xmlns="http://www.w3.org/2000/svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.63257 10.25C7.43892 10.25 8.16648 9.80416 8.6641 9.16967C9.43726 8.18384 10.4117 7.3634 11.5255 6.77021C12.2477 6.38563 12.8743 5.81428 13.1781 5.05464C13.3908 4.5231 13.5 3.95587 13.5 3.38338V2.75C13.5 2.33579 13.8358 2 14.25 2C15.4926 2 16.5 3.00736 16.5 4.25C16.5 5.40163 16.2404 6.49263 15.7766 7.46771C15.511 8.02604 15.8836 8.75 16.5019 8.75M16.5019 8.75H19.6277C20.6544 8.75 21.5733 9.44399 21.682 10.4649C21.7269 10.8871 21.75 11.3158 21.75 11.75C21.75 14.5976 20.7581 17.2136 19.101 19.2712C18.7134 19.7525 18.1142 20 17.4962 20H13.4802C12.9966 20 12.5161 19.922 12.0572 19.7691L8.94278 18.7309C8.48393 18.578 8.00342 18.5 7.51975 18.5H5.90421M16.5019 8.75H14.25M5.90421 18.5C5.98702 18.7046 6.07713 18.9054 6.17423 19.1022C6.37137 19.5017 6.0962 20 5.65067 20H4.74289C3.85418 20 3.02991 19.482 2.77056 18.632C2.43208 17.5226 2.25 16.3451 2.25 15.125C2.25 13.5725 2.54481 12.0889 3.08149 10.7271C3.38655 9.95303 4.16733 9.5 4.99936 9.5H6.05212C6.52404 9.5 6.7973 10.0559 6.5523 10.4593C5.72588 11.8198 5.25 13.4168 5.25 15.125C5.25 16.3185 5.48232 17.4578 5.90421 18.5Z" stroke="#6F6F6F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        paginatedReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
    <div class="review-content">
        <div class="user">
            <img src="${review['profile-pic']}" alt="${review.username}" class="profile-pic">
            <h3 class="username">${review.username}</h3>
            <p class="date-time">${new Date(review.date).toLocaleDateString()} ${new Date(review.date).toLocaleTimeString()}</p>
        </div>
            <div class="star-rating">${getStarRating(review.rating)}</div>
            <p class="comment">${review.comment}</p>
        <div class="like-dislike-buttons">
            <div class="dislike-btn">
                <button class="dislike-button">${review.dislikes} ${dislikeSvg} </button>
            </div>
            <div class="like-btn">
                <button class="like-button">${review.likes} ${likeSvg} </button>
            </div>
        </div>
    </div>
`;
            reviewsContainer.appendChild(reviewElement);
        });
    }


    function setupPagination(reviews) {
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add("pagination-button");
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                displayReviews(reviews);
            });
            paginationControls.appendChild(button);
        }
    }

    fetchReviews();
});