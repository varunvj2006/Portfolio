// Resume download functionality
function downloadResume() {
    // You can replace this with a link to your actual resume file
    const resumeUrl = 'path/to/your/resume.pdf';
    
    // For now, show an alert - replace with actual download logic
    alert('Resume download feature - please add your resume file path in script.js');
    
    // Uncomment and modify this when you have a resume file:
    // const link = document.createElement('a');
    // link.href = resumeUrl;
    // link.download = 'Your_Name_Resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Remove old icon navigation scroll effect since it's now stationary

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all section titles and cards
document.querySelectorAll('.section-title, .project-card, .skill-category, .stat').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    skillObserver.observe(item);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Theme toggle (optional feature)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #6366f1;
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
createThemeToggle();

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (scrollTop > 300) {
        themeToggle.style.opacity = '1';
    } else {
        themeToggle.style.opacity = '0.7';
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);
