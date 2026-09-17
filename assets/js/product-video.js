// Load the YouTube player only after the visitor chooses to watch.
document.querySelectorAll('[data-product-video]').forEach(function (player) {
  const launch = player.querySelector('[data-video-launch]');
  const id = player.dataset.productVideo;
  if (!launch || !/^[\w-]{11}$/.test(id)) return;
  launch.addEventListener('click', function (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const iframe = document.createElement('iframe');
    const url = new URL('https://www.youtube-nocookie.com/embed/' + id);
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('rel', '0');
    url.searchParams.set('playsinline', '1');
    iframe.src = url.href;
    iframe.title = player.dataset.videoTitle || 'Elite Rackz repair video';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(iframe);
    iframe.focus();
  });
});
