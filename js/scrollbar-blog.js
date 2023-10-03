//------SCROLLBAR------
const blogPreviewGroup = document.getElementById('blog-preview-group');
const blogPreviewGroupWrapper = document.getElementById('blog-preview-group-wrapper');
const blogProgressbarLine = document.getElementById('blog-progressbar-line');
const blogProgressbar = document.getElementById('blog-progressbar');

//------получаем нужные размеры из стилей----
let stylesBlogPrewGroupWrapper
let stylesBlogPrewGroup
let heightBlogPrewGroupWrapper
let fullHeightBlogList
function gettingВimensionsBlockFn() {
  //получаем все стили нужных блоков
  stylesBlogPrewGroupWrapper = window.getComputedStyle(blogPreviewGroupWrapper)
  stylesBlogPrewGroup = window.getComputedStyle(blogPreviewGroup)
  //высота окна превью блогов
  heightBlogPrewGroupWrapper = blogPreviewGroupWrapper.offsetHeight
  //высота списка блогов
  fullHeightBlogList = blogPreviewGroup.offsetHeight

}
function scrollbarVisible() {
  let blogWindowHeight = blogPreviewGroupWrapper.offsetHeight
  let blogListHeight = blogPreviewGroup.offsetHeight
  if (blogWindowHeight >= blogListHeight) {
    blogProgressbar.style.display = 'none'
  } else { blogProgressbar.style.display = '' }
}
//высчитываем процентное соотношение списка блогов относительно видимой части и делаем высоту скроллтрекера относительной этому соотношению
let percentBlogVisible
function percentBlogVisibleOrListFn() {
  let bottomPositionPreviewGroupWrapper = Math.trunc(blogPreviewGroupWrapper.getBoundingClientRect().bottom)
  let bottomPositionPreviewGroup = Math.trunc(blogPreviewGroup.getBoundingClientRect().bottom)
  percentBlogVisible = (bottomPositionPreviewGroupWrapper * 100 / bottomPositionPreviewGroup)
  blogProgressbarLine.style.height = percentBlogVisible + '%'
}

//---получаем процент смещения списка блогов
let percentBlogListScroll
let bottomPositionPreviewGroupWrapper
let bottomPositionPreviewGroup
let maxTopPositionLineProgressbar
let topPositionScrollTracker
let r
let q
function percentBlogListScrollFn() {
  bottomPositionPreviewGroupWrapper = Math.trunc(blogPreviewGroupWrapper.getBoundingClientRect().bottom)
  bottomPositionPreviewGroup = Math.trunc(blogPreviewGroup.getBoundingClientRect().bottom)
  percentBlogListScroll = (bottomPositionPreviewGroupWrapper * 100 / bottomPositionPreviewGroup)
  topPositionScrollTracker = percentBlogListScroll - percentBlogVisible
  //смещаем трекер скроллбара на нужную высоту в пикселях
  let heightProgressbar = window.getComputedStyle(blogProgressbar).height.replace(/[a-zA-Z]/gi, '');
  let heightProgressbarLine = window.getComputedStyle(blogProgressbarLine).height.replace(/[a-zA-Z]/gi, '');
  r = heightProgressbar - heightProgressbarLine
  q = heightProgressbarLine * 100 / heightProgressbar
  maxTopPositionLineProgressbar = r
}

//---получаем область самого трекера скролл бара для отслеживания клика на нем
let botomPositionProgressbar
let topPositionProgressbar
let topPositionProgressbarLine
let botomPositionProgressbarLine
let leftPositionProgressbarLine
let rightPositionProgressbarLine
function newPositionProgressbarLine() {
  botomPositionProgressbar = Math.trunc(blogProgressbar.getBoundingClientRect().bottom)
  topPositionProgressbar = Math.trunc(blogProgressbar.getBoundingClientRect().top)
  botomPositionProgressbarLine = Math.trunc(blogProgressbarLine.getBoundingClientRect().bottom)
  topPositionProgressbarLine = Math.trunc(blogProgressbarLine.getBoundingClientRect().top)
  leftPositionProgressbarLine = Math.trunc(blogProgressbarLine.getBoundingClientRect().left)
  rightPositionProgressbarLine = Math.trunc(blogProgressbarLine.getBoundingClientRect().right)
}

let startPositionLineProgressbar = 0
let topLine
let yMouse
let xMouse
function onMouseMove(event) {
  newPositionProgressbarLine()
  topLine = +blogProgressbarLine.style.top.replace(/[a-zA-Z]/gi, '');
  if (botomPositionProgressbar >= botomPositionProgressbarLine && 0 <= topLine) {
    //перемещение трекера скролл бара
    let oldY = yMouse
    let newY = event.clientY;
    let rr = newY - oldY
    startPositionLineProgressbar = startPositionLineProgressbar + rr
    blogProgressbarLine.style.top = startPositionLineProgressbar + 'px';
    yMouse = newY
    //---перемещение блока с контентом связанным со скролл баром
    //получаем процент смещения прогресс бара
    percentBlogListScrollFn()
    let topHeightLineProgressbar = Math.trunc(blogProgressbarLine.style.top.replace(/[a-zA-Z]/gi, ''))
    let percentScrollLineProgressbar = topHeightLineProgressbar * 100 / maxTopPositionLineProgressbar
    //высчитываем величину для смещения блока с контентом блог
    let scrollBlockContextBlogGroup = (fullHeightBlogList - heightBlogPrewGroupWrapper) * percentScrollLineProgressbar / 100
    //сдвиг блока
    blogPreviewGroupWrapper.scrollTo({
      top: scrollBlockContextBlogGroup,
      left: 0,
    })
  }
  else {
    collisionLineScrollbar()
    newPositionProgressbarLine()
  }
}
function returnMouseMove(event) {
  document.removeEventListener('mousemove', onMouseMove, false);
  blogProgressbarLine.onmouseup = false;
}
function mousePosition(event) {
  yMouse = event.clientY
  xMouse = event.clientX
}

//если трекер скролл бара вышел за пределы допустимого положения возвращаем его обратно на крайние соответствующие места
function collisionLineScrollbar() {
  let topLine = +blogProgressbarLine.style.top.replace(/[a-zA-Z]/gi, '');
  let heightProgressbar = window.getComputedStyle(blogProgressbar).height.replace(/[a-zA-Z]/gi, '');
  let heightProgressbarLine = window.getComputedStyle(blogProgressbarLine).height.replace(/[a-zA-Z]/gi, '');
  if (topLine <= 0) {
    blogProgressbarLine.style.top = 1 + 'px'
  }
  if (botomPositionProgressbar <= botomPositionProgressbarLine) {
    blogProgressbarLine.style.top = heightProgressbar - heightProgressbarLine + 'px'
    startPositionLineProgressbar = heightProgressbar - heightProgressbarLine
  }
  newPositionProgressbarLine()
}

//----синхронизация скроллбара кастомного------
//-------- с прокручиваемым блоком-------
blogPreviewGroupWrapper.addEventListener('scroll', () => {
  gettingВimensionsBlockFn()
  percentBlogListScrollFn()
  blogProgressbarLine.style.top = topPositionScrollTracker * r / (100 - q) + 'px'
})
//-----------------------------------------

blogProgressbarLine.onmouseover = () => {
  newPositionProgressbarLine()
  collisionLineScrollbar()
}
blogProgressbarLine.onpointerdown = () => {
  newPositionProgressbarLine()
  collisionLineScrollbar()
}

//----------функция драгон дроп--------
window.onmousedown = function (event) {
  newPositionProgressbarLine()
  mousePosition(event)
  if (topPositionProgressbarLine <= yMouse && yMouse <= botomPositionProgressbarLine && leftPositionProgressbarLine <= xMouse && xMouse <= rightPositionProgressbarLine) {
    mousePosition(event)
    //включение перетаскивания
    document.addEventListener('mousemove', onMouseMove, false);
    //отключение драгон дроп функции
    window.onmouseup = () => {
      returnMouseMove(event)
      newPositionProgressbarLine()
      collisionLineScrollbar()
      return
    };
    //доп отключение драгон дроп функции
    window.onclick = () => {
      returnMouseMove(event)
      newPositionProgressbarLine()
      collisionLineScrollbar()
      return
    };
  }
};


//----функция тач---
function returnTuchMove(event) {
  document.removeEventListener('pointermove', onMouseMove, false);
  blogProgressbarLine.onpointerup = false;
}
window.onpointerdown = function (event) {
  newPositionProgressbarLine()
  mousePosition(event)
  if (topPositionProgressbarLine <= yMouse && yMouse <= botomPositionProgressbarLine && leftPositionProgressbarLine <= xMouse && xMouse <= rightPositionProgressbarLine) {
    mousePosition(event)
    //включение перетаскивания
    document.addEventListener('pointermove', onMouseMove, false);
    //отключение драгон дроп функции
    window.onpointerup = () => {
      returnTuchMove(event)
      newPositionProgressbarLine()
      collisionLineScrollbar()
      return
    };
    //доп отключение драгон дроп функции
    window.onclick = () => {
      returnTuchMove(event)
      newPositionProgressbarLine()
      collisionLineScrollbar()
      return
    };
  }
};

//----ВЫЗОВ ФУНКЦИЙ---
window.onload = function () {
  scrollbarVisible()
  gettingВimensionsBlockFn()
  percentBlogVisibleOrListFn()
};