// Presentation Navigation Script

let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;
const slides = document.querySelectorAll('.slide');
const progressFill = document.querySelector('.progress-fill');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize
totalSlidesSpan.textContent = totalSlides;
updateSlide();

// Update slide display
function updateSlide() {
    // Update slide visibility
    slides.forEach((slide, index) => {
        const slideNum = index + 1;
        slide.classList.remove('active', 'prev');
        
        if (slideNum === currentSlide) {
            slide.classList.add('active');
        } else if (slideNum < currentSlide) {
            slide.classList.add('prev');
        }
    });
    
    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update slide indicator
    currentSlideSpan.textContent = currentSlide;
    
    // Update button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    
    // Animate content in
    animateSlideContent();
}

// Animate slide content
function animateSlideContent() {
    const activeSlide = document.querySelector('.slide.active');
    const animatedElements = activeSlide.querySelectorAll(
        '.content-card, .stat-card, .feature-item, .example-item, .benefit-item, .challenge-item, .example-card, .trend-item, .point-item, .flow-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.remove('animated');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('animated');
    });
}

// Go to next slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

// Go to previous slide
function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

// Button event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        currentSlide = 1;
        updateSlide();
    } else if (e.key === 'End') {
        e.preventDefault();
        currentSlide = totalSlides;
        updateSlide();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Prevent scrolling on mobile
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Auto-hide navigation hint after 5 seconds
setTimeout(() => {
    const hint = document.querySelector('.keyboard-hint');
    if (hint) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            hint.style.display = 'none';
        }, 1000);
    }
}, 5000);

// Add smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation to first slide
    const firstSlide = document.querySelector('.slide.active');
    if (firstSlide) {
        animateSlideContent();
    }
});

// Fullscreen support (optional - can be triggered manually)
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add fullscreen button functionality (optional)
// Uncomment to enable fullscreen button
/*
const fullscreenBtn = document.createElement('button');
fullscreenBtn.textContent = '⛶';
fullscreenBtn.className = 'fullscreen-btn';
fullscreenBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 999;
    padding: 10px 15px;
    background: rgba(15, 23, 42, 0.8);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;
`;
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.body.appendChild(fullscreenBtn);
*/

// Add slide transition sound effect (optional)
// You can add audio feedback for slide changes
function playSlideSound() {
    // Create a subtle sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Uncomment to enable sound effects
// prevBtn.addEventListener('click', playSlideSound);
// nextBtn.addEventListener('click', playSlideSound);

// Export current slide for external use (if needed)
window.presentation = {
    currentSlide: () => currentSlide,
    totalSlides: () => totalSlides,
    goToSlide: (num) => {
        if (num >= 1 && num <= totalSlides) {
            currentSlide = num;
            updateSlide();
        }
    },
    next: nextSlide,
    prev: prevSlide
};
