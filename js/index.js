// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target + '+';
        }
    };

    // Start counting when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
        }
    });
    observer.observe(counter);
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');
const leftTree = document.getElementById('leftTree');
const rightTree = document.getElementById('rightTree');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Show scroll to top button
    if (scrollPosition > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
    
    // Grow trees when scrolling down
    if (scrollPosition > 200) {
        leftTree.classList.add('grow');
        rightTree.classList.add('grow');
    } else {
        leftTree.classList.remove('grow');
        rightTree.classList.remove('grow');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Anchor Links
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

// Contact Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('ขอบคุณที่ติดต่อเรา!\nทีมงานจะตอบกลับภายใน 24 ชั่วโมง');
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    this.reset();
});

// Falling Leaves Effect
function createFallingLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('falling-leaf');
    
    // Random leaf types (more autumn colors)
    const leafTypes = ['leaf-maple', 'leaf-brown', 'leaf-yellow', 'leaf-brown'];
    const randomType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
    leaf.classList.add(randomType);
    
    // Random starting position
    leaf.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (15-25 seconds for more realistic slow fall)
    const duration = Math.random() * 10 + 15;
    leaf.style.animationDuration = duration + 's';
    
    // Random animation delay
    const delay = Math.random() * 3;
    leaf.style.animationDelay = delay + 's';
    
    // Mostly zigzag for realistic wind effect
    const animations = ['fallZigzag', 'fallZigzag', 'fall', 'fallLeft'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    leaf.style.animationName = randomAnimation;
    
    // Smaller, more realistic size
    const size = Math.random() * 8 + 12; // 12-20px
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';
    leaf.style.fontSize = size + 'px';
    
    // Random opacity for depth
    const opacity = Math.random() * 0.4 + 0.4; // 0.4-0.8
    leaf.style.opacity = opacity;
    
    document.getElementById('fallingLeavesContainer').appendChild(leaf);
    
    // Remove leaf after animation completes
    setTimeout(() => {
        leaf.remove();
    }, (duration + delay) * 1000);
}

// Create leaves periodically
function startFallingLeaves() {
    // Create initial batch (fewer leaves)
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFallingLeaf();
        }, i * 800);
    }
    
    // Continue creating leaves slowly
    setInterval(() => {
        // Random chance to create leaf (not every interval)
        if (Math.random() > 0.3) {
            createFallingLeaf();
        }
    }, 2500); // Every 2.5 seconds
}

// Start falling leaves when page loads
window.addEventListener('load', () => {
    startFallingLeaves();
    
    // Auto play forest sound
    const forestSound = document.getElementById('forestSound');
    if (forestSound) {
        forestSound.volume = 0.3; // ตั้งระดับเสียงที่ 30%
        // Try to play automatically
        const playPromise = forestSound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Auto-play was prevented, play on first user interaction
                console.log('Auto-play prevented, waiting for user interaction');
                document.body.addEventListener('click', () => {
                    forestSound.play();
                }, { once: true });
            });
        }
    }
});

