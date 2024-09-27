document.addEventListener('DOMContentLoaded', function () {
    const showMoreButtonDescription = document.querySelector('.show-more-btn-description');
    const showMoreButtonInfo = document.querySelector(".show-more-btn-info");
    const bookDescription = document.querySelector('.book-description');
    const bookInfo = document.querySelector(".book-info");

    showMoreButtonDescription.addEventListener('click', () => {
        bookDescription.classList.toggle('expanded');

        if (bookDescription.classList.contains('expanded')) {
            showMoreButtonDescription.textContent = 'Show less';
        } else {
            showMoreButtonDescription.textContent = 'Show more';
        }
    });

    showMoreButtonInfo.addEventListener('click', () => {
        bookInfo.classList.toggle('expanded');

        if (bookInfo.classList.contains('expanded')) {
            showMoreButtonInfo.textContent = 'Show less';
        } else {
            showMoreButtonInfo.textContent = 'Show more';
        }
    });
});