document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.toggle-bubble');
  const menuOverlay = document.querySelector('.bubble-menu-items');
  const bubbles = Array.from(document.querySelectorAll('.pill-link'));
  const labels = Array.from(document.querySelectorAll('.pill-label'));

  let isMenuOpen = false;

  const animationEase = 'back.out(1.5)';
  const animationDuration = 0.5;
  const staggerDelay = 0.12;

  const menuItems = [
    { rotation: -8 },
    { rotation: 8 },
    { rotation: 8 },
    { rotation: 8 },
    { rotation: -8 }
  ];

  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('open', isMenuOpen);
    menuToggle.setAttribute('aria-pressed', isMenuOpen);

    if (isMenuOpen) {
      menuOverlay.style.display = 'flex';
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          menuOverlay.style.display = 'none';
        }
      });
    }
  });

  const handleResize = () => {
    if (isMenuOpen) {
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    }
  };

  window.addEventListener('resize', handleResize);
  
  // Also close menu when a link is clicked
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      if (isMenuOpen) {
        isMenuOpen = false;
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-pressed', 'false');
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.to(labels, {
            y: 24,
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power3.in'
        });
        gsap.to(bubbles, {
            scale: 0,
            duration: 0.2,
            ease: 'power3.in',
            onComplete: () => {
            menuOverlay.style.display = 'none';
            }
        });
      }
    });
  });
});