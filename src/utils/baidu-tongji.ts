if (import.meta.env.MODE === 'cdn') {
  console.debug('Baidu tongji installed');
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?9eb28d9814e01d0d20ea7fe50a7b54bb';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode?.insertBefore(hm, s);
  })();
}
