// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            menuToggle.innerHTML = '<i class="fas fa-times text-xl"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }
    });

    // Mobile Menu Links - Close the menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        });
    });

    // Project Modals
    const modalButtons = document.querySelectorAll('.view-project-btn');
    const modalCloseButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    
    // Initialisation - s'assurer que toutes les modales sont cachées
    function initModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
            modal.style.opacity = '0';
            modal.classList.remove('active');
        });
    }
    
    // Exécuter l'initialisation
    initModals();
    
    // Open modal
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // Fermer toutes les autres modales d'abord
                modals.forEach(m => {
                    if (m.id !== modalId && m.style.display === 'block') {
                        closeModal(m);
                    }
                });
                
                // Ouvrir la modale demandée
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                
                // Animate the modal
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modal.classList.add('active');
                }, 10);
            } else {
                console.error("Modal not found with ID:", modalId);
            }
        });
    });
    
    // Close modal when clicking the close button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Function to close modal with animation
    function closeModal(modal) {
        if (!modal) return;
        
        modal.style.opacity = '0';
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }, 300);
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form inputs (basic validation)
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just log it to the console
            console.log('Form Submission:', { name, email, subject, message });
            
            // Reset the form
            contactForm.reset();
            
            // Show success message
            alert('Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.');
        });
    }

    // Typing Animation Effect for the Hero Section
    const typingElement = document.querySelector('.code-font');
    
    if (typingElement) {
        // This is a simple way to create a typing effect
        // For a more sophisticated typing effect, you might want to use a library like Typed.js
        
        // We'll keep it simple for demonstration
        function simulateTyping() {
            typingElement.style.borderRight = '2px solid var(--highlight)';
            typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
        }
        
        // Call the function when the page loads
        simulateTyping();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });

    // Preload images to avoid flickering during transitions
    function preloadImages() {
        const projectImages = document.querySelectorAll('.project-image img');
        const imageSources = [];
        
        projectImages.forEach(img => {
            imageSources.push(img.src);
        });
        
        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Call the preload function
    preloadImages();
});

// Add an animation to show the page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide the preloader if you have one
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});