// admin/assets/script.js
// General JavaScript for admin panel (can be empty if not needed, or for common functionalities)

// Example: Simple active link highlighting (can be done with PHP/Tailwind as well)
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.w-64.bg-gray-800 nav ul li a');

    navLinks.forEach(link => {
        // Compare the href with the current path
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active:bg-gray-700'); // Add the active class
        } else {
            link.classList.remove('active:bg-gray-700');
        }
    });
});