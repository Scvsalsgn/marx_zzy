// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(196, 30, 58, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.intro-card, .timeline-item, .work-card, .comment-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Comment submission functionality
const submitBtn = document.querySelector('.submit-btn');
const textarea = document.querySelector('.comment-placeholder textarea');

if (submitBtn && textarea) {
    submitBtn.addEventListener('click', () => {
        const comment = textarea.value.trim();
        if (comment) {
            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment-card';
            newComment.innerHTML = `
                <h3>我的感想</h3>
                <p class="comment-author">— 刚刚发表</p>
                <p class="comment-text">${comment}</p>
            `;
            
            // Insert before the user comment card
            const userComment = document.querySelector('.user-comment');
            userComment.parentNode.insertBefore(newComment, userComment);
            
            // Clear textarea
            textarea.value = '';
            
            // Show success message
            showNotification('感想已发表！');
            
            // Animate new comment
            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(30px)';
            setTimeout(() => {
                newComment.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
            }, 100);
        } else {
            showNotification('请输入您的感想', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Noto Sans SC', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Add hover effects for timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Add click to copy functionality for quotes
document.querySelectorAll('.work-quote').forEach(quote => {
    quote.style.cursor = 'pointer';
    quote.title = '点击复制名言';
    
    quote.addEventListener('click', () => {
        const text = quote.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('名言已复制到剪贴板！');
        }).catch(() => {
            showNotification('复制失败，请手动复制', 'error');
        });
    });
});



// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality); 