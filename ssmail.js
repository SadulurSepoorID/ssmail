function toggleContent(header) {
  const card = header.parentElement;
  const content = card.querySelector('.content');
  const button = header.querySelector('.toggle-btn');

  const isOpen = content.classList.contains('open');

  if (isOpen) {
    content.classList.remove('open');
    button.textContent = 'Buka';
  } else {
    content.classList.add('open');
    button.textContent = 'Tutup';
  }
}

function showPreview(button) {
  event.preventDefault();

  const url = button.getAttribute('data-pdf-url');
  const previewContainer = button.nextElementSibling;

  if (previewContainer.style.display === 'none') {
    previewContainer.innerHTML = `<iframe src="${url}" width="100%" height="480" frameborder="0" allow="autoplay"></iframe>`;
    previewContainer.style.display = 'block';
    button.textContent = 'Tutup Surat';
  } else {
    previewContainer.innerHTML = '';
    previewContainer.style.display = 'none';
    button.textContent = 'Preview Surat';
  }
}

function toggleDarkMode() {
  const body = document.body;
  const modeIcon = document.getElementById("modeIcon");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeIcon.textContent = "🌕";
  } else {
    modeIcon.textContent = "🌑";
  }
}

function goBack() {
  window.location.href = "https://bit.ly/SadulursepoorID"; // ganti sesuai nama file tujuan lu
}

function filterFiles() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const name = card.querySelector('.file-name').textContent.toLowerCase();
    const fileCategory = card.getAttribute('data-category');

    const matchSearch = name.includes(search);
    const matchCategory = category === 'all' || fileCategory === category;

    if (matchSearch && matchCategory) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}