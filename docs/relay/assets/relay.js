'use strict';

// Base URL 的唯一内容来源是 index.html 中的只读输入框。
const baseUrl = document.querySelector('#base-url');
const copyButton = document.querySelector('#copy-url');
const copyStatus = document.querySelector('#copy-status');
let resetStatus;

copyButton.addEventListener('click', async () => {
  clearTimeout(resetStatus);
  let copied = false;
  try {
    await navigator.clipboard.writeText(baseUrl.value);
    copied = true;
  } catch {
    // iframe 的剪贴板权限可能受限；尝试本地复制，再降级为手动选择。
    baseUrl.focus();
    baseUrl.select();
    try { copied = document.execCommand('copy'); } catch { /* 保留选中文本 */ }
  }
  copyStatus.textContent = copied ? 'Base URL 已复制。' : '自动复制受限，地址已选中，请长按复制或按 Ctrl/Cmd+C。';
  if (copied) {
    copyButton.focus();
    resetStatus = setTimeout(() => { copyStatus.textContent = ''; }, 4500);
  }
});

document.querySelectorAll('[data-copy-base]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.closest('.config-card').querySelector('[data-copy-status]');
    let copied = false;
    try {
      await navigator.clipboard.writeText(baseUrl.value);
      copied = true;
    } catch {
      const value = button.closest('.config-card').querySelector('[data-base-url]');
      const range = document.createRange();
      range.selectNodeContents(value);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try { copied = document.execCommand('copy'); } catch { /* 保留选中文本 */ }
    }
    status.textContent = copied ? 'Base URL 已复制。' : '地址已选中，请长按复制或按 Ctrl/Cmd+C。';
  });
});
