// Sejm Website Clone - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Cookie Notice Functionality
    const cookieNotice = document.querySelector('.highlight-box');
    const closeCookieBtn = cookieNotice.querySelector('.btn');
    
    closeCookieBtn.addEventListener('click', function() {
        cookieNotice.style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });
    
    // Check if user already consented to cookies
    if (localStorage.getItem('cookieConsent') === 'true') {
        cookieNotice.style.display = 'none';
    }
    
    // Navigation Active State
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Table Row Hover Effect Enhancement
    const tableRows = document.querySelectorAll('.sessions-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        row.addEventListener('click', function() {
            // Navigate to session details (placeholder)
            console.log('Navigating to session details');
        });
    });
    
    // Search Button Functionality
    const searchBtn = document.querySelector('.header-right .btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = prompt('Wyszukaj w serwisie Sejmu:');
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Implement actual search functionality
            }
        });
    }
    
    // Dynamic Date Display in Header
    const dateElement = document.querySelector('.header-top span');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const polishDate = today.toLocaleDateString('pl-PL', options);
        dateElement.textContent = polishDate.charAt(0).toUpperCase() + polishDate.slice(1);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // News Item Hover Effects
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Button Ripple Effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Sidebar Link Animation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '15px';
            this.style.transition = 'padding-left 0.3s ease';
        });
        link.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '0';
        });
    });
    
    // Mobile Menu Toggle (for responsive design)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.cssText = `
                display: block;
                background: var(--primary-red);
                color: white;
                border: none;
                padding: 10px 15px;
                font-size: 20px;
                cursor: pointer;
                margin: 10px auto;
            `;
            
            if (!document.querySelector('.mobile-menu-btn')) {
                nav.parentNode.insertBefore(mobileMenuBtn, nav);
                mobileMenuBtn.classList.add('mobile-menu-btn');
                
                mobileMenuBtn.addEventListener('click', function() {
                    const navUl = nav.querySelector('ul');
                    navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        }
    };
    
    // Initial check and resize listener
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Loading Animation for Page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Accessibility - Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-nav *:focus {
            outline: 3px solid var(--primary-red);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
    
    console.log('Sejm Website Clone - All functionalities loaded successfully!');
});

// Utility Functions
const SejmUtils = {
    // Format date in Polish format
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pl-PL', options);
    },
    
    // Get current session status
    getSessionStatus: function(status) {
        const statuses = {
            'planned': 'Planowane',
            'ongoing': 'W trakcie',
            'completed': 'Zakończone'
        };
        return statuses[status] || status;
    },
    
    // Navigate to section
    navigateToSection: function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};