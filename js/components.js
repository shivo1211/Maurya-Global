// Header and Footer Templates
const headerTemplate = `
<!-- Header -->
<header id="header">
    <nav>
        <a href="index.html" class="logo-link">
            <img src="assets/logo/logo.png" alt="Maurya Global Logo" class="logo">
        </a>
        <ul class="nav-links">
            <li><a href="index.html" id="nav-home">Home</a></li>
            <li><a href="products.html" id="nav-products">Products</a></li>
            <li><a href="about.html" id="nav-about">About Us</a></li>
            <li><a href="#contact" class="btn btn-primary" style="color: white;">Contact Us</a></li>
        </ul>
    </nav>
</header>
`;

const footerTemplate = `
<!-- Footer -->
<footer id="contact">
    <div class="footer-content">
        <div class="footer-section">
            <h3>Maurya Global</h3>
            <p>Your trusted partner in premium Indian agricultural exports. Bringing authenticity and quality to global markets.</p>
        </div>
        <div class="footer-section">
            <h3>Quick Links</h3>
            <a href="index.html">Home</a>
            <a href="products.html">Products</a>
            <a href="about.html">About Us</a>
        </div>
        <div class="footer-section">
            <h3>Products</h3>
            <a href="products.html">Grains & Rice</a>
            <a href="products.html">Spices</a>
            <a href="products.html">Pulses & Lentils</a>
            <a href="products.html">Flour</a>
        </div>
        <div class="footer-section">
            <h3>Contact Us</h3>
            <p>📧 info@mauryaglobal.com</p>
            <p>📞 +91 99671 95231</p>
            <p>📍 Maurya Global, Khaordi, Marve Road, Malad West, Mumbai 400095 MH, IN</p>
            <p>📌 <a href="https://maps.app.goo.gl/qFhbxK1Z716YCCfH9"
                    target="_blank" style="color: rgba(255, 255, 255, 0.8); text-decoration: underline;">View on
                    Google Maps</a></p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 Maurya Global Export Company. All rights reserved.</p>
    </div>
</footer>
`;

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
    }

    // Inject footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.getElementById('nav-home');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPage === 'products.html') {
        const productsLink = document.getElementById('nav-products');
        if (productsLink) productsLink.classList.add('active');
    } else if (currentPage === 'about.html') {
        const aboutLink = document.getElementById('nav-about');
        if (aboutLink) aboutLink.classList.add('active');
    }

    // Add scroll effect to header - always visible with enhanced shadow on scroll
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const header = document.getElementById('header');
                if (header) {
                    const currentScrollY = window.scrollY;

                    // Add scrolled class for enhanced styling when past threshold
                    if (currentScrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
