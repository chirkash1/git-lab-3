// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  }, { threshold: 0.1 });
}, { rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-anim="fade-in-up"], [data-anim="slide-up"]').forEach(el => {
  observer.observe(el);
});

// Анимация счётчиков
const countUp = () => {
  const items = document.querySelectorAll('[data-anim="count-up"]');
  items.forEach(item => {
    const target = +item.getAttribute('data-target');
    const countEl = item.querySelector('.count');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      if (current < target) {
        current += step;
        countEl.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        countEl.textContent = target;
      }
    };

    update();
  });
};

// Запускаем счётчики, когда они попадают в область видимости
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-anim="count-up"]').forEach(el => {
  counterObserver.observe(el);
});
