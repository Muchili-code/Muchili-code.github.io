'use strict';

// 桌面按整屏翻页；触摸、矮窗口及辅助技术仍使用原生滚动。
(() => {
  const main = document.querySelector('#main');
  const screens = [...main.querySelectorAll('[data-section]')];
  if (screens.length < 2) return;
  const desktop = matchMedia('(min-width: 901px) and (min-height: 680px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = document.createElement('nav');
  navigation.className = 'section-nav';
  navigation.setAttribute('aria-label', '首页分屏导航');
  screens.forEach((screen, index) => {
    const link = document.createElement('a');
    link.href = `#${screen.id}`;
    link.setAttribute('aria-label', `${index + 1}. ${screen.dataset.section}`);
    const label = document.createElement('span');
    label.textContent = screen.dataset.section;
    link.append(label);
    navigation.append(link);
  });
  document.body.append(navigation);
  const links = [...navigation.querySelectorAll('a')];
  let current = 0;
  let lockedUntil = 0;
  let lastWheel = 0;
  let wheelTotal = 0;
  let wheelDirection = 0;
  let gestureConsumed = false;
  let scheduled = false;

  function update() {
    const edge = desktop.matches ? main.getBoundingClientRect().top : 0;
    current = screens.reduce((best, section, index) =>
      Math.abs(section.getBoundingClientRect().top - edge) < Math.abs(screens[best].getBoundingClientRect().top - edge) ? index : best, 0);
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    screens.forEach((screen, index) => screen.classList.toggle('is-current', index === current));
    scheduled = false;
  }
  function scheduleUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  function go(index) {
    const next = Math.max(0, Math.min(index, screens.length - 1));
    lockedUntil = performance.now() + (reducedMotion.matches ? 200 : 850);
    screens[next].scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  }
  main.addEventListener('wheel', event => {
    if (!desktop.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const now = performance.now();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? main.clientHeight : 1);
    const direction = Math.sign(delta);
    if (!direction) return;
    const idle = now - lastWheel > 180;
    lastWheel = now;
    const rect = screens[current].getBoundingClientRect();
    const top = main.getBoundingClientRect().top;
    // 内容超过一屏时先让用户读完，不把溢出内容锁在屏幕之外。
    const canReadMore = direction > 0 ? rect.bottom > top + main.clientHeight + 3 : rect.top < top - 3;
    if (screens[current].offsetHeight > main.clientHeight + 3 && canReadMore && now >= lockedUntil) return;
    event.preventDefault();
    if (idle || direction !== wheelDirection) { wheelTotal = 0; gestureConsumed = false; }
    wheelDirection = direction;
    if (now < lockedUntil || gestureConsumed) { wheelTotal = 0; return; }
    wheelTotal += delta;
    if (Math.abs(wheelTotal) < 45) return;
    // 同一次触控板手势的惯性不连续翻过多个章节。
    go(current + direction);
    gestureConsumed = true;
    wheelTotal = 0;
  }, { passive: false });

  document.addEventListener('keydown', event => {
    if (!desktop.matches || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
    const direction = event.key === 'PageDown' || event.key === 'ArrowDown' || (event.key === ' ' && !event.shiftKey) ? 1 : event.key === 'PageUp' || event.key === 'ArrowUp' || (event.key === ' ' && event.shiftKey) ? -1 : 0;
    if (direction) { event.preventDefault(); if (performance.now() >= lockedUntil) go(current + direction); }
    else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); go(event.key === 'Home' ? 0 : screens.length - 1); }
  });
  main.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  update();
})();
