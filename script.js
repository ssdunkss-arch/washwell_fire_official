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
