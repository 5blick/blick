// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // ===== Changing Fonts on Hover for "BLICK" Element =====
    const blickElement = document.querySelector('.blick');
    const fonts = [
        'Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console',
        'Tahoma', 'Verdana', 'Times New Roman', 'Comic Sans MS', 'Papyrus'
    ];
    let interval;

    blickElement.addEventListener('mouseover', () => {
        interval = setInterval(() => {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            blickElement.style.fontFamily = randomFont;
        }, 200);
    });

    blickElement.addEventListener('mouseout', () => {
        clearInterval(interval);
        blickElement.style.fontFamily = '';
    });

    // ===== Interactive Bubble Movement =====
    const interBubble = document.querySelector('.interactive');
    let curX = 0, curY = 0, tgX = 0, tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    // ===== Adjust Underline Width for Navbar Buttons =====
    document.querySelectorAll('.discord-button, .terms-button, .faqs-button, .reviews-button').forEach(button => {
        const textElement = button.querySelector('.text-default');
        const textWidth = textElement.offsetWidth;
        button.style.setProperty('--underline-width', `${textWidth + 6}px`);
    });

    // ===== Scroll-Triggered Animations for "ABOUT US" and "PRODUCTS" Sections =====
    function createObserver(elements) {
        const options = { root: null, rootMargin: '0px', threshold: 0.1 };

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-active');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    const aboutUsHeader = document.querySelector('.about-us-section h1');
    const aboutUsSubtitle = document.querySelector('.about-us-subtitle');
    const productsHeader = document.querySelector('.products-section h1');
    const productsSubtitle = document.querySelector('.products-section .about-us-subtitle');
    createObserver([aboutUsHeader, aboutUsSubtitle, productsHeader, productsSubtitle]);

    // ===== Staggered Animations for Info Boxes =====
    const staggeredBoxesGroup1 = document.querySelectorAll('.animate-staggered-1');
    const staggeredBoxesGroup2 = document.querySelectorAll('.animate-staggered-2');

    createObserver(staggeredBoxesGroup1);
    createObserver(staggeredBoxesGroup2);

    // ===== Staggered Animation for Product Cards =====
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.classList.add(`animate-staggered-${(index % 2) + 1}`);
    });
    createObserver(productCards);

    // ===== FAQ Section Expand/Collapse Functionality =====
    const faqBoxes = document.querySelectorAll('.faq-box');

    faqBoxes.forEach(box => {
        const question = box.querySelector('.faq-question');
        const answer = box.querySelector('.faq-answer');
        const arrow = question.querySelector('.arrow');

        question.addEventListener('click', () => {
            const isActive = box.classList.contains('active');

            // Collapse all open FAQs
            faqBoxes.forEach(b => {
                b.classList.remove('active');
                b.querySelector('.faq-answer').style.maxHeight = null;
                b.querySelector('.arrow').style.transform = 'rotate(0deg)';
            });

            // Expand the clicked FAQ if it wasn't already active
            if (!isActive) {
                box.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ===== Smooth Scroll for Navbar and Footer Buttons with Offset =====
    function smoothScrollToSection(buttonSelector, targetSelector, offset = 0) {
        const button = document.querySelector(buttonSelector);
        const targetSection = document.querySelector(targetSelector);

        if (button && targetSection) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            });
        }
    }

    // Navbar Buttons
    smoothScrollToSection('.terms-button', '.terms-section');
    smoothScrollToSection('.faqs-button', '.faq-section');
    smoothScrollToSection('.products-button', '.products-section', -100);

    // Footer Navigation Buttons with Custom Offsets
    smoothScrollToSection('.footer-link[href="/home"]', 'body', 0);
    smoothScrollToSection('.footer-link[href="/about"]', '.about-us-section', -100);
    smoothScrollToSection('.footer-link[href="/products"]', '.products-section', -100);
    smoothScrollToSection('.footer-link[href="/faqs"]', '.faq-section');
    smoothScrollToSection('.footer-link[href="/terms"]', '.terms-section');

    // ===== Scroll to Products Section on Browse Button Click =====
    smoothScrollToSection('.browse-button', '.products-section', -100);

    // ===== Detect Bottom of Page and Scroll to Top after Timeout =====
    let bottomTimer;
    let isAtBottom = false;

    function startBottomTimer() {
        clearTimeout(bottomTimer);
        bottomTimer = setTimeout(() => {
            if (isAtBottom) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 3000);
    }

    window.addEventListener('scroll', () => {
        // Check if at bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (!isAtBottom) {
                isAtBottom = true;
                setTimeout(() => {
                    if (isAtBottom) startBottomTimer();
                }, 500); // Wait for 2 seconds to confirm user is at the bottom
            }
        } else {
            isAtBottom = false;
            clearTimeout(bottomTimer);
        }
    });
});
