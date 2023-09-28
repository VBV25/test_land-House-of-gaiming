$(document).ready(function () {
  //-----ВЕРТИКАЛЬНЫЕ ПОЛОСЫ-----
  function verticalTicker() {
    //---1---
    let marqueeFirst = $('#first-marquee');
    marqueeFirst.wrapInner('<span>');
    marqueeFirst.find('span').css({ height: 'max-content', display: 'inline-flex', flexDirection: 'column' });
    let heightStringFirst = marqueeFirst.find('span').height();
    marqueeFirst.append(marqueeFirst.find('span').clone());
    marqueeFirst.wrapInner('<div>');
    let heightString2First = heightStringFirst * 2;
    marqueeFirst.find('div').css({ height: heightString2First, display: 'inline-flex', flexDirection: 'column' });
    let resetFirst = function () {
      $(this).css('margin-top', '0%');
      $(this).animate({ 'margin-top': -1 * heightStringFirst },
        55000,
        'linear',
        resetFirst
      );
    };
    resetFirst.call(marqueeFirst.find('div'));
    //---2---

    let marqueeSecond = $('#second-marquee');
    marqueeSecond.wrapInner('<span>');
    marqueeSecond.find('span').css({ height: 'max-content', display: 'inline-flex', flexDirection: 'column' });
    let heightStringSecond = marqueeSecond.find('span').height();
    marqueeSecond.prepend(marqueeSecond.find('span').clone());
    marqueeSecond.wrapInner('<div>');
    let heightString2Second = heightStringSecond * 2;
    marqueeSecond.find('div').css({ height: heightString2Second, display: 'inline-flex', flexDirection: 'column' });
    let resetSecond = function () {
      $(this).css('margin-bottom', '0%');
      $(this).animate({ 'margin-bottom': -1 * heightStringSecond },
        45000,
        'linear',
        resetSecond
      );
    };
    resetSecond.call(marqueeSecond.find('div'));

    //---3---
    let marqueeThird = $('#third-marquee');
    marqueeThird.wrapInner('<span>');
    marqueeThird.find('span').css({ height: 'max-content', display: 'inline-flex', flexDirection: 'column' });
    let heightStringThird = marqueeThird.find('span').height();
    marqueeThird.append(marqueeThird.find('span').clone());
    marqueeThird.wrapInner('<div>');
    let heightString2Third = heightStringThird * 2;
    marqueeThird.find('div').css({ height: heightString2Third, display: 'inline-flex', flexDirection: 'column' });
    let resetThird = function () {
      $(this).css('margin-top', '0%');
      $(this).animate({ 'margin-top': -1 * heightStringThird },
        35000,
        'linear',
        resetThird
      );
    };
    resetThird.call(marqueeThird.find('div'));
  }

  verticalTicker()
})
