// Existing code (unchanged)
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// New code for video speed controller
const video = document.querySelector('video');
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

let isMouseDown = false;

function handleMove(e) {
  if (!isMouseDown) return;
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min;
  
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(1) + '×';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousedown', () => isMouseDown = true);
speed.addEventListener('mouseup', () => isMouseDown = false);
speed.addEventListener('mouseleave', () => isMouseDown = false);
speed.addEventListener('mousemove', handleMove);