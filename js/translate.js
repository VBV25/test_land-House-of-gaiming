const btnLanguage = document.getElementById('language');
const btnMobileLanguage = document.getElementById('language-mobile');
const btnLoginIn = document.getElementById('loginIn');
const btnSignUp = document.getElementById('signUp');
const translateOblectsArr = Array.from(document.querySelectorAll('.translate-text'))

let translateList = [
  ['About us', 'О нас'],
  ['Brands', 'Бренды'],
  ['Commissions', 'Комиссии'],
  ['News', 'Новости'],
  ['Contact us', 'Связь'],
  ['Careers', 'Карьера'],
  ['Login in', 'Вход'],
  ['Sign up', 'Регистрация'],
  ['Blog', 'Блог'],
  ['Raise your ROI with direct advertiser', 'Повысьте рентабельность инвестиций с помощью прямого рекламодателя'],
  ['Become a Partner', 'Стать партнером'],
  ['Payment methods: Skrill, Neteller, webmoney, Bank transfer', 'Способы оплаты: Skrill, Neteller, Webmoney, банковский перевод'],
  ['Our social media:', 'Наши социальные сети:'],
  ['Terms & Conditions', 'Правила и условия'],
  ['Cookies', 'Куки'],
  ['Contacts', 'Контакты'],
  ['Careers', 'Карьера'],
  ['Brand Guide', 'Бренд-гид']
]

function translateBlockFn(baseArr) {
  let attrBtnLanguage = btnLanguage.getAttribute('data-lang')
  translateOblectsArr.forEach((el) => {
    let textInBlockLower = el.innerText.toLowerCase();
    baseArr.forEach((element) => {
      element.forEach(elText => {
        let textEl = elText
        let textElLower = textEl.toLowerCase();
        if (textInBlockLower == textElLower) {
          let indexArr = element.indexOf(textEl);
          if (attrBtnLanguage == 'en') {
            if (indexArr == 1) {
              el.innerText = element[0];
            }
          }
          if (attrBtnLanguage == 'ru') {
            if (indexArr == 0) {
              el.innerText = element[1];
            }
          }
        }
      })
    })
  })
}

btnLanguage.onclick = () => {
  //для скролла в блоге
  gettingВimensionsBlockFn()
  percentBlogVisibleOrListFn()
  //перевод
  btnLanguage.classList.toggle('ru')
  if (btnLanguage.classList.contains('ru')) {
    btnLanguage.querySelector('span').innerText = 'ru'
    btnLanguage.setAttribute('data-lang', 'ru')
  }
  else {
    btnLanguage.querySelector('span').innerText = 'en'
    btnLanguage.setAttribute('data-lang', 'en')
  }
  translateBlockFn(translateList)
}

btnMobileLanguage.onclick = () => {
  //для скролла в блоге
  gettingВimensionsBlockFn()
  percentBlogVisibleOrListFn()
  //перевод
  btnLanguage.classList.toggle('ru')
  if (btnLanguage.classList.contains('ru')) {
    btnLanguage.querySelector('span').innerText = 'ru'
    btnLanguage.setAttribute('data-lang', 'ru')
  }
  else {
    btnLanguage.querySelector('span').innerText = 'en'
    btnLanguage.setAttribute('data-lang', 'en')
  }
  translateBlockFn(translateList)
}