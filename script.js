window.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgm');
  const footerBtn = document.getElementById('footer-play-btn');
  const currentTimeSpan = document.getElementById('current-time');
  const durationSpan = document.getElementById('duration');
  const progressBar = document.getElementById('progress-bar');
  const progressBarContainer = document.querySelector('.progress-bar-container');

  // 再生・停止ボタン
  footerBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function() {
    footerBtn.textContent = '⏸';
  });

  audio.addEventListener('pause', function() {
    footerBtn.textContent = '▶';
  });

  // 時間表示とプログレスバー
  function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  audio.addEventListener('loadedmetadata', function() {
    durationSpan.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function() {
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    if (audio.duration) {
      progressBar.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
  });

  // プログレスバークリックでシーク
  progressBarContainer.addEventListener('click', function(e) {
    const rect = progressBarContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    if (audio.duration) {
      audio.currentTime = ratio * audio.duration;
    }
  });
});
