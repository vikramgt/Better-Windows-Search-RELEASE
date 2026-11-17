'use strict';

const repository = 'vikramgt/Better-Windows-Search';
const releasesUrl = `https://github.com/${repository}/releases`;
const video = document.getElementById('launch-video');
const playButton = document.getElementById('play-button');
const soundButton = document.getElementById('sound-button');

function showPlayButton() {
  if (video.error) return;
  playButton.textContent = video.ended ? 'Replay video' : video.currentTime > 0 ? 'Resume video' : 'Play video';
  playButton.hidden = false;
}

playButton.addEventListener('click', async () => {
  try { await video.play(); } catch { showPlayButton(); }
});
video.addEventListener('play', () => { playButton.hidden = true; });
video.addEventListener('pause', showPlayButton);
video.addEventListener('ended', showPlayButton);
video.addEventListener('volumechange', () => {
  soundButton.textContent = video.muted ? 'Enable sound' : 'Mute';
  soundButton.setAttribute('aria-pressed', String(!video.muted));
});
soundButton.addEventListener('click', async () => {
  video.muted = !video.muted;
  if (video.paused) {
    try { await video.play(); } catch { showPlayButton(); }
  }
});
video.addEventListener('error', () => {
  playButton.hidden = true;
  soundButton.hidden = true;
  document.getElementById('video-fallback').hidden = false;
});
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.autoplay = false;
  video.pause();
  showPlayButton();
} else {
  video.play().catch(showPlayButton);
}
