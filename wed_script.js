// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFloatingElements();
    initNavigation();
    initStoryTimeline();
    initGallery();
    initCountdown();
    initRSVPForm();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

// Create floating hearts and flowers
function initFloatingElements() {
    const heartsContainer = document.getElementById('floatingHearts');
    const flowersContainer = document.getElementById('floatingFlowers');
    
    // Create hearts
    for (let i = 0; i < 15; i++) {
        createFloatingElement(heartsContainer, 'heart', '❤');
    }
    
    // Create flowers
    for (let i = 0; i < 15; i++) {
        createFloatingElement(flowersContainer, 'flower', '❀');
    }
}

function createFloatingElement(container, className, symbol) {
    const element = document.createElement('div');
    element.className = className;
    element.innerHTML = symbol;
    
    // Random position and animation delay
    const leftPos = Math.random() * 100;
    const delay = Math.random() * 8;
    
    element.style.left = `${leftPos}%`;
    element.style.animationDelay = `${delay}s`;
    
    container.appendChild(element);
}

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    // Add/remove scrolled class to header
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Check if story timeline items are in view
    checkStoryTimeline();
}

// Story timeline animation
function initStoryTimeline() {
    // Initially check which items are in view
    checkStoryTimeline();
}

function checkStoryTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const position = item.getBoundingClientRect();
        
        // If item is in viewport
        if (position.top < window.innerHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Gallery carousel functionality - FIXED VERSION
function initGallery() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('galleryDots');
    
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    let currentIndex = 0;
    
    // Create dots
    for (let i = 0; i < itemCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Position carousel items in a circle
    function positionItems() {
        const radius = 300; // Distance from center of carousel
        const angle = 360 / itemCount;
        
        items.forEach((item, i) => {
            // Calculate position for each item
            const itemAngle = angle * i;
            
            // Apply 3D transform
            item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
            
            // Set initial opacity and z-index
            item.style.opacity = i === 0 ? 1 : 0.6;
            item.style.zIndex = i === 0 ? 10 : 1;
        });
    }
    
    // Function to go to specific slide
    function goToSlide(index) {
        // Handle wrap-around
        if (index < 0) index = itemCount - 1;
        if (index >= itemCount) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Calculate the rotation for the carousel
        const angle = 360 / itemCount;
        const rotateY = -currentIndex * angle;
        
        // Apply the transform to the carousel
        carousel.style.transform = `rotateY(${rotateY}deg)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update item opacity and z-index for better visibility
        items.forEach((item, i) => {
            if (i === currentIndex) {
                item.style.opacity = 1;
                item.style.zIndex = 10;
            } else {
                item.style.opacity = 0.6;
                item.style.zIndex = 1;
            }
        });
    }
    
    // Set up event listeners for buttons
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
    });
    
    // Initialize the carousel
    positionItems();
    goToSlide(0);
    
    // Auto-rotate the carousel (optional)
    let autoRotate = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
}

// Countdown timer
function initCountdown() {
    const weddingDate = new Date('October 12, 2023 15:00:00').getTime();
    
    // Update countdown every second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown').innerHTML = '<div class="countdown-ended">We\'re married!</div>';
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// RSVP Form functionality
function initRSVPForm() {
    const rsvpForm = document.getElementById('weddingRsvpForm');
    const rsvpConfirmation = document.getElementById('rsvpConfirmation');
    const newResponseBtn = document.getElementById('newResponse');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show the confirmation message
        
        // Hide form, show confirmation
        rsvpForm.style.display = 'none';
        rsvpConfirmation.style.display = 'block';
    });
    
    newResponseBtn.addEventListener('click', function() {
        // Show form, hide confirmation
        rsvpForm.style.display = 'block';
        rsvpConfirmation.style.display = 'none';
        
        // Reset form
        rsvpForm.reset();
    });
}