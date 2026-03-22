    // ── Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
 
    // ── Mobile menu toggle
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const ham = document.getElementById('hamburger');
      menu.classList.toggle('open');
      ham.classList.toggle('open');
    }
 
    // ── Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
 
    // ── Smooth close mobile menu on nav click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
      });
    });
 
    // ── Animated counter
    function animateCounter(el, target) {
      let start = 0;
      const duration = 1800;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
 
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-num').forEach(num => {
            const text = num.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
              const val = parseInt(match[1]);
              const suffix = text.replace(val, '');
              num.dataset.suffix = suffix;
              animateCounter(num, val);
            }
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);