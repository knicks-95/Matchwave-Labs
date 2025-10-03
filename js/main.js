/**
 * main.js
 * Main JavaScript file that initializes all components and functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initServiceHover();
});

/**
 * Initialize the responsive navigation
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
}

/**
 * Update the active navigation link based on scroll position
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-text, .reveal-item');
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Set up scroll event listener
    window.addEventListener('scroll', () => {
        checkElementsInViewport();
    });
    
    /**
     * Check if elements are in viewport and trigger animations
     */
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.classList.add('revealed');
            }
        });
    }
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.type !== 'submit' && element.hasAttribute('required')) {
                    if (!element.value.trim()) {
                        isValid = false;
                        element.classList.add('error');
                    } else {
                        element.classList.remove('error');
                    }
                }
            }
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For this example, we'll just show a success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    submitBtn.textContent = 'Message Sent!';
                    
                    // Reset button after a delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
}

/**
 * Initialize service card hover effects
 */
function initServiceHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle movement to icons inside the hovered card
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset the icon state
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}