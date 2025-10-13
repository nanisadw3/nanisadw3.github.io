document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('glitch-canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  let animationFrameId;
  let letters = [];
  let grid = { columns: 0, rows: 0 };
  let lastGlitchTime = Date.now();

  // --- Configuration from the user's request ---
  const glitchColors = ['#2b4539', '#61dca3', '#61b3dc'];
  const glitchSpeed = 50;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
  const smooth = true;
  // --- End Configuration ---

  const lettersAndSymbols = Array.from(characters);
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns, rows) => {
    grid = { columns, rows };
    const totalLetters = columns * rows;
    letters = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }));
  };

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context || letters.length === 0) return;
    const { width, height } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
    context.font = `${fontSize}px monospace`;
    context.textBaseline = 'top';

    letters.forEach((letter, index) => {
      const x = (index % grid.columns) * charWidth;
      const y = Math.floor(index / grid.columns) * charHeight;
      context.fillStyle = letter.color;
      context.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters || letters.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.length);
      if (!letters[index]) continue;

      letters[index].char = getRandomChar();
      letters[index].targetColor = getRandomColor();

      if (!smooth) {
        letters[index].color = letters[index].targetColor;
        letters[index].colorProgress = 1;
      } else {
        letters[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      resizeCanvas();
      animate();
    }, 100);
  };

  window.addEventListener('resize', handleResize);

  resizeCanvas();
  animate();
});