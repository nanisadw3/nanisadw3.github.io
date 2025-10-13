// Animaciones de Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const isVisible = elementTop < window.innerHeight - 100;
        if (isVisible) {
            element.classList.add('is-visible');
        }
    });
    animateProgressBars(); // Call progress bar animation on scroll
};

document.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll); // Para animar los elementos que ya son visibles al cargar la página

// Desplazamiento Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Descarga del CV
document.addEventListener('DOMContentLoaded', () => {
    const cvButton = document.querySelector('a[href="cv/cv_inaki_sobera.pdf?v=1.1"]');
    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'cv/cv_inaki_sobera.pdf?v=1.1';
            link.download = 'cv_inaki_sobera.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});


// Ocultar indicador de scroll al hacer scroll
document.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 50) { // Ajusta este valor según cuándo quieres que desaparezca
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

function copyToClipboard(elementId, buttonId) {
    const textToCopy = document.getElementById(elementId).innerText;
    const button = document.getElementById(buttonId);

    const showSuccessMessage = () => {
        const originalText = button.innerText;
        button.innerText = '¡Copiado!';
        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(showSuccessMessage).catch(err => {
            console.error('Error al copiar con navigator.clipboard: ', err);
            fallbackCopyTextToClipboard(textToCopy, showSuccessMessage);
        });
    } else {
        fallbackCopyTextToClipboard(textToCopy, showSuccessMessage);
    }
}

function fallbackCopyTextToClipboard(text, successCallback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            successCallback();
        } else {
            console.error('Error al copiar con document.execCommand');
        }
    } catch (err) {
        console.error('Error al copiar con document.execCommand: ', err);
    }

    document.body.removeChild(textArea);
}

// Animación de Barras de Progreso
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const isVisible = barTop < window.innerHeight - 100;
        if (isVisible && !bar.classList.contains('animated')) {
            const progress = bar.dataset.progress;
            bar.style.width = `${progress}%`;
            bar.classList.add('animated');
            
        }
    });
};

// Text Scramble Effect
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('scramble-text');
  if (el) {
    const fx = new TextScramble(el);
    const phrases = [
      'Iñaki Sobera Sotomayor',
      'Desarrollador de Software',
      'Ingeniero de Software',
    ];
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1500);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
  }
});