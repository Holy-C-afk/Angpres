// Smooth scrolling for navigation links with offset for sticky nav
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navHeight - 20; // 20px extra spacing
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            entry.target.classList.add('visible');
            
            // Animate cards with stagger effect
            if (entry.target.querySelector('.cards-container')) {
                const cards = entry.target.querySelectorAll('.card:not(.visible)');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
            
            // Animate content boxes
            const contentBoxes = entry.target.querySelectorAll('.content-box:not(.visible)');
            contentBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('visible');
                }, index * 150);
            });
            
            // Animate benefit items
            const benefitItems = entry.target.querySelectorAll('.benefit-item:not(.visible)');
            benefitItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
            
            // Animate stat boxes
            const statBoxes = entry.target.querySelectorAll('.stat-box:not(.visible)');
            statBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('visible');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Highlight active navigation link on scroll and add shadow to nav
let ticking = false;

function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const nav = document.querySelector('nav');
    
    let current = '';
    const scrollPos = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Add shadow to nav when scrolled
    if (scrollPos > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateActiveNav);
        ticking = true;
    }
}, { passive: true });

// Add smooth fade-in on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for first section if it's already in view
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            setTimeout(() => {
                if (!firstSection.classList.contains('visible')) {
                    firstSection.classList.add('visible');
                    
                    // Animate child elements
                    const cards = firstSection.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 300 + (index * 100));
                    });
                    
                    const contentBoxes = firstSection.querySelectorAll('.content-box');
                    contentBoxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add('visible');
                        }, 300 + (index * 150));
                    });
                }
            }, 300);
        }
    }
});

// Add mouse move parallax effect to cards (only when visible)
document.querySelectorAll('.card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('visible')) {
            isHovering = true;
        }
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('visible') || !isHovering) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        isHovering = false;
        if (card.classList.contains('visible')) {
            card.style.transform = '';
        }
    });
});

