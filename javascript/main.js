
//scroll to top of website when user clicks the button
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

//alert
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    header.addEventListener('click', function () {
        alert('Hello, welcome to my website!');
    });
});