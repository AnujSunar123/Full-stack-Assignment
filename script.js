// Shared JavaScript for all pages

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Handle home page cases
        if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.2s ease-out';
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('.tech-card, .code-block, .hero-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    });
}

// Enhanced hover effects for tech cards
document.addEventListener('DOMContentLoaded', function() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            window.location.href = 'index.html';
        }
    }
});

// Simple analytics tracking (console log for demonstration)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded:', window.location.pathname);
    console.log('User agent:', navigator.userAgent);
    console.log('Viewport size:', window.innerWidth + 'x' + window.innerHeight);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});