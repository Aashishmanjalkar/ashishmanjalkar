// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission with Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Replace with your actual Formspree endpoint
        const formspreeEndpoint = 'https://formspree.io/f/xrbqjynq';
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                })
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].message || 'Failed to send message');
            }
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            formMessage.style.display = 'block';
            setTimeout(() => formMessage.style.display = 'none', 5000);
        }
    });
}