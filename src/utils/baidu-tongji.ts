if (import.meta.env.MODE === 'cdn') {
  console.debug('Baidu tongji installed');
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?b6b58635a8304396f110af0c2fe07d75';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode?.insertBefore(hm, s);
  })();
}
