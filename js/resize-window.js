
$(window).resize(function () {
  heightWindow = window.innerHeight;
  widthWindow = window.innerWidth;

  scrollbarVisible()
  gettingВimensionsBlockFn()
  percentBlogVisibleOrListFn()
  popupMenuHeight()

  baseFnTrackString($('#vertical-first-marquee'), -1)
  baseFnTrackString($('#vertical-second-marquee'), 1)
  baseFnTrackString($('#vertical-third-marquee'), -1)
  baseFnTrackString($('#horizontal-first-marquee'), -1)
  baseFnTrackString($('#horizontal-second-marquee'), 1)
  baseFnTrackString($('#horizontal-third-marquee'), -1)
});
