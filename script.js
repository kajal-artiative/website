document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form submission
    const emailScript = document.createElement('Script');
    emailScript.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    document.head.appendChild(emailScript);


    emailScript.onload = () => {
        emailjs.init("AoXj1GhkOfKH_GkZs");
        const contactForm = document.querySelector('.contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const templateParams = {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    message: document.getElementById("message").value
                };

                emailjs.send('service_ycwh46k', 'template_z703c3k', templateParams)
                    .then(function () {
                        // Success popup
                        Swal.fire({
                            icon: 'success',
                            title: 'Message Sent!',
                            text: 'Thank you for your message! We will get back to you soon.',
                            confirmButtonColor: '#3085d6'
                        });

                        contactForm.reset();
                    }, function (error) {
                        // Error popup
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Send',
                            text: 'Please try again.',
                            confirmButtonColor: '#d33'
                        });

                        console.error('FAILED...', error);
                    });
            });
        }
    };

    // Sticky navbar on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
