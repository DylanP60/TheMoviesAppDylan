const filter = document.getElementById('filter');
const order = document.getElementById('order');
document.getElementById('filter-tab').addEventListener('click', () => {
  if (filter.classList.contains('show') !== true) {
    document.getElementById('order-tab').classList.remove('active');
    document.getElementById('filter-tab').classList.add('active');
    filter.classList.add('show');
    order.classList.remove('show');
    setTimeout(() => {
      filter.classList.add('active');
      order.classList.remove('active');
    }, 150);
  }
});
document.getElementById('order-tab').addEventListener('click', () => {
  if (order.classList.contains('show') !== true) {
    document.getElementById('filter-tab').classList.remove('active');
    document.getElementById('order-tab').classList.add('active');
    filter.classList.remove('show');
    order.classList.add('show');
    setTimeout(() => {
      order.classList.add('active');
      filter.classList.remove('active');
    }, 150);
  }
});
