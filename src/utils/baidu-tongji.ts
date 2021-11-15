if (import.meta.env.MODE === 'cdn') {
  console.debug('Baidu tongji installed');
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?c5a1703dbc66ac55ad5439d39a96372c';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode?.insertBefore(hm, s);
  })();
}
