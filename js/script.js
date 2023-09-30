//---------------Mobile menue-------------------
const btnBurgerMenu = document.getElementById('btn-menu-burger');
const navBlockHeader = document.getElementById('nav-block-header');
let heightWindow = window.innerHeight;
let widthWindow = window.innerWidth;
let heightHeader = document.getElementById('header').offsetHeight;

function popupMenuHeight() {
  if (navBlockHeader.classList.contains('active-mobile')) {
    navBlockHeader.style.top = heightHeader + 'px'
    navBlockHeader.style.minHeight = heightWindow - heightHeader + 'px'
  }
  else { navBlockHeader.style.top = '' }
}

btnBurgerMenu.onclick = () => {
  btnBurgerMenu.classList.toggle('active')
  navBlockHeader.classList.toggle('active-mobile')
  popupMenuHeight()
}
//----------------------------------------------

//--------БЕГУЩИЕ СТРОКИ-------------------------
let firstStringMovement = document.getElementById('first-marquee');
let secondStringMovement = document.getElementById('second-marquee');
let thirdStringMovement = document.getElementById('third-marquee');
function cloneImg(numLine) {
  let tickerString = $(numLine);
  tickerString.append(tickerString.find('article.ticker-img-group').clone())
  tickerString.prepend(tickerString.find('article.ticker-img-group').clone())
}
function cloneBlockImgString(numLine, direction) {
  let marquee = $(numLine);
  marquee.wrapInner('<span>');
  if (direction == 1) { marquee.prepend(marquee.find('span').clone()); }
  if (direction == -1) { marquee.append(marquee.find('span').clone()); }
  marquee.wrapInner('<div>');
  marquee.find('span').css({ width: 'max-content', height: 'max-content', display: 'flex' });
  marquee.find('div').css({ display: 'flex' });
}
function baseFnTrackString(numLine, direction) {
  let lrdu = direction
  let hWindow = window.innerHeight;
  let wWindow = window.innerWidth;
  let marqueMovement = $(numLine);

  let flexDirect
  let heightBase
  let widthBase
  let heightClone
  let widthClone
  if (wWindow > hWindow) {
    flexDirect = 'column'
  }
  else {
    flexDirect = 'row'
  }

  marqueMovement.find('span').css({ 'flex-direction': flexDirect });
  marqueMovement.find('div').css({ 'flex-direction': flexDirect });

  const reset = function () {
    hWindow = window.innerHeight;
    wWindow = window.innerWidth;
    let w
    let h
    if (lrdu == 1) {
      w = marqueMovement.find('span')[1].offsetWidth
      h = marqueMovement.find('span')[1].offsetHeight
    } else {
      w = marqueMovement.find('span').width();
      h = marqueMovement.find('span').height()
    }
    if (wWindow > hWindow) {
      heightBase = h//marqueMovement.find('span').height();
      widthBase = 0
      heightClone = heightBase * 2
      widthClone = 'max-content'
    }
    else {
      widthBase = w // marqueMovement.find('span').width();
      heightBase = 0
      widthClone = widthBase * 2
      heightClone = 'max-content'
    }
    marqueMovement.find('div').css({ width: widthClone, height: heightClone });

    $(this).css({ 'margin': '0% 0% 0% 0%' });
    if (lrdu == 1 && widthBase != 0) {
      $(this).animate({ 'margin-right': lrdu * widthBase * -1 },
        35000,
        'linear', reset
      );
    }
    if (lrdu == -1 && widthBase != 0) {
      $(this).animate({ 'margin-left': lrdu * widthBase },
        35000,
        'linear', reset
      );
    }
    if (lrdu == 1 && heightBase != 0) {
      $(this).animate({ 'margin-bottom': lrdu * heightBase * -1 },
        35000,
        'linear', reset
      );
    }
    if (lrdu == -1 && heightBase != 0) {
      $(this).animate({ 'margin-top': lrdu * heightBase },
        35000,
        'linear', reset
      );
    }
  }
  reset.call(marqueMovement.find('div'));
}
//------------------------------------------------

//--------------------------------------------------
$(document).ready(function () {
  cloneImg($('#horizontal-first-marquee'))
  cloneImg($('#horizontal-second-marquee'))
  cloneImg($('#horizontal-third-marquee'))
  //-------------------
  cloneImg($('#vertical-first-marquee'))
  cloneImg($('#vertical-second-marquee'))
  cloneImg($('#vertical-third-marquee'))

  setTimeout(() => {
    cloneBlockImgString($('#vertical-first-marquee'), -1)
    cloneBlockImgString($('#vertical-second-marquee'), 1)
    cloneBlockImgString($('#vertical-third-marquee'), -1)
    baseFnTrackString($('#vertical-first-marquee'), -1)
    baseFnTrackString($('#vertical-second-marquee'), 1)
    baseFnTrackString($('#vertical-third-marquee'), -1)
    //-----------------
    cloneBlockImgString($('#horizontal-first-marquee'), -1)
    cloneBlockImgString($('#horizontal-second-marquee'), 1)
    cloneBlockImgString($('#horizontal-third-marquee'), -1)
    baseFnTrackString($('#horizontal-first-marquee'), -1)
    baseFnTrackString($('#horizontal-second-marquee'), 1)
    baseFnTrackString($('#horizontal-third-marquee'), -1)
  }, 500)
})
//-----------------------------------------------------------
