const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const visualImages = [
  {
    selector: '.hero-image-slot .visual-placeholder',
    src: './assets/hero-fire-laundry.jpg',
    alt: '화재피해 의류와 침구를 전문 작업자가 확인하는 워시웰 화재세탁 현장'
  },
  {
    selector: '#problem + .visual-section .visual-placeholder',
    src: './assets/sorting-fire-laundry.jpg',
    alt: '화재피해 의류를 오염 단계별로 분류하는 작업 장면'
  },
  {
    selector: '#process + .visual-section-alt .visual-placeholder',
    src: './assets/inspection-record.jpg',
    alt: '화재피해 세탁물의 상태를 기록하고 보험 제출자료를 준비하는 장면'
  },
  {
    selector: '#price + .visual-section .visual-placeholder',
    src: './assets/recovery-process.jpg',
    alt: '전문 세탁 설비를 활용한 화재세탁 복구 공정 장면'
  },
  {
    selector: '.final-visual-section .visual-placeholder',
    src: './assets/packing-consulting.jpg',
    alt: '복구세탁 완료 후 포장과 상담을 진행하는 워시웰 직원'
  }
];

visualImages.forEach(({ selector, src, alt }) => {
  const target = document.querySelector(selector);
  if (!target) return;

  const image = new Image();
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.className = 'slot-image';

  image.addEventListener('load', () => {
    target.prepend(image);
    target.classList.add('has-image');
  });
});

const searchInput = document.querySelector('#priceSearch');
const tabs = document.querySelectorAll('.tab');
const rows = document.querySelectorAll('.price-table tbody tr');
let activeCategory = 'all';

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, '');
}

function filterRows() {
  const keyword = normalize(searchInput?.value || '');
  rows.forEach((row) => {
    const category = row.dataset.category;
    const text = normalize(row.innerText);
    const categoryMatch = activeCategory === 'all' || category === activeCategory;
    const keywordMatch = !keyword || text.includes(keyword);
    row.classList.toggle('hide', !(categoryMatch && keywordMatch));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.filter || 'all';
    filterRows();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', filterRows);
}
