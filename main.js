/* ================================
   MANASH KUMAR PORTFOLIO - JS
   Fully Interactive & Functional
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Typing Effect
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Frontend Developer',
        'Data Analyst',
        'UI/UX Designer',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    let countersStarted = false;

    function startCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Skills Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                setTimeout(animateSkills, 300);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonials Swiper
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const service = formData.get('service');
        const message = formData.get('message');

        // Create WhatsApp message
        const whatsappMessage = `Hi Manash,%0A%0AI'm ${name} and I want to discuss a project with you.%0A%0A*Subject:* ${subject}%0A*Service:* ${service || 'General Inquiry'}%0A*Email:* ${email}%0A%0A*Message:*%0A${message}%0A%0ALooking forward to hearing from you!`;

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Update WhatsApp link
        const whatsappBtn = formSuccess.querySelector('.btn-whatsapp');
        whatsappBtn.href = `https://wa.me/918102498071?text=${whatsappMessage}`;

        // Auto-open WhatsApp after 2 seconds
        setTimeout(() => {
            window.open(whatsappBtn.href, '_blank');
        }, 2000);

        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
        }, 10000);
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        alert('Thank you for subscribing with: ' + email + '! You will receive updates soon.');
        this.reset();
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Add hover effect to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Certificate hover effect
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Certificate Modal Functions
function openCertificateModal(certId) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    const certData = {
        'cert1': {
            img: 'images/certificate1.png',
            title: 'PW Data Analytics Professional Certificate',
            desc: 'This comprehensive certification from PW covers the entire data analytics process including data collection, cleaning, analysis, and visualization. Skills acquired: SQL, R, Tableau, spreadsheets, and data storytelling.'
        },
        'cert2': {
            img: 'images/certificate2.png',
            title: 'Coursera Data analysis with excel Professional Certificate',
            desc: 'Advanced certification by Coursera covering data analysis techniques using Excel. Skills acquired: data cleaning, visualization, and statistical analysis.'
        },
        'cert3': {
            img: 'images/certificate3.png',
            title: 'AWS Cloud Practitioner',
            desc: 'Foundational AWS certification demonstrating understanding of cloud concepts, AWS core services, security, architecture, pricing, and support. Essential for cloud-based development and deployment.'
        },
        'cert4': {
            img: 'images/certificate3.png',
            title: 'Udemy Python for Data Science',
            desc: 'Comprehensive Python programming certification from Udemy. Covers data structures, Pandas, NumPy, data visualization with Matplotlib/Seaborn, and machine learning basics with scikit-learn.'
        }
    };

    const cert = certData[certId];
    if (cert) {
        modalImg.src = cert.img;
        modalTitle.textContent = cert.title;
        modalDesc.textContent = cert.desc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Project Details Modal
function showProjectDetails(title, desc) {
    const modal = document.getElementById('projectModal');
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalDesc').textContent = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Blog Post Modal
function showBlogPost(title, desc) {
    const modal = document.getElementById('blogModal');
    document.getElementById('blogModalTitle').textContent = title;
    document.getElementById('blogModalDesc').textContent = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Download CV Function
function downloadCV() {
    // Create a simple CV content
    const cvContent = `
MANASH KUMAR
Frontend Developer & Data Analyst

CONTACT
Phone: +91 81024 98071
Email: manash@example.com
Location: India
WhatsApp: https://wa.me/918102498071

PROFESSIONAL SUMMARY
Passionate Frontend Developer and Data Analyst with 5+ years of experience 
creating stunning web experiences and transforming complex data into 
actionable insights. Expert in React, JavaScript, Python, SQL, and data 
visualization tools.

SKILLS
Frontend: HTML5, CSS3, JavaScript, React.js, Vue.js, Tailwind CSS
Data: Python, SQL, Power BI, Tableau, Excel, Pandas, NumPy
Tools: Git, Figma, VS Code, Jupyter Notebook

EXPERIENCE
Senior Frontend Developer - Tech Solutions (2022-Present)
- Developed 50+ responsive websites and web applications
- Improved site performance by 40% through optimization techniques
- Led a team of 5 developers on major client projects

Data Analyst - Analytics Pro (2020-2022)
- Built interactive dashboards for 20+ clients
- Automated reporting processes saving 100+ hours monthly
- Identified key trends that increased client revenue by 25%

EDUCATION
B.Tech in Computer Science - IIT (2016-2020)

CERTIFICATIONS
- Google Data Analytics Professional
- Meta Frontend Developer Professional
- AWS Cloud Practitioner
- IBM Python for Data Science

Downloaded from: https://manash-portfolio.com
    `;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Manash_Kumar_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('CV downloaded successfully! You can also contact me directly on WhatsApp: +91 81024 98071');
}

// Show More Projects
function showMoreProjects() {
    alert('More projects coming soon! Contact me on WhatsApp (+91 81024 98071) to discuss your project ideas.');
}

// Close modals on outside click
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Keyboard navigation
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Console greeting
console.log('%c👋 Welcome to Manash Kumar Portfolio!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%c📱 WhatsApp: +91 81024 98071', 'font-size: 14px; color: #25d366;');
console.log('%c💼 Frontend Developer & Data Analyst', 'font-size: 14px; color: #06b6d4;');
