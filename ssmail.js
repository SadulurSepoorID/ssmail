async function loadArsip() {
  const response = await fetch('ssmail.json');
  const arsip = await response.json();

  const container = document.getElementById('arsipContainer');
  container.innerHTML = '';

  arsip.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-category', item.kategori);

    card.innerHTML = `
      <div class="card-header" onclick="toggleContent(this)">
        <div class="file-icon">✉️</div>
        <div class="file-info">
          <div class="file-name">${item.judul}</div>
          <div class="file-date">Diunggah: ${item.tanggal_upload}</div>
        </div>
        <button class="toggle-btn">Buka</button>
      </div>
      <div class="content">
        <p>${item.isi.replace(/\n/g, '<br>')}</p>
        ${item.preview_link ? `<button class="preview-btn" onclick="showPreview(this)" data-pdf-url="${item.preview_link}">Preview Surat</button><div class="pdf-preview" style="display: none;"></div>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

// Fungsi untuk toggle konten isi surat
function toggleContent(header) {
  const card = header.parentElement;
  const content = card.querySelector('.content');
  const button = header.querySelector('.toggle-btn');

  const isOpen = content.classList.contains('open');

  if (isOpen) {
    content.classList.remove('open');
    content.style.display = 'none';
    button.textContent = 'Buka';
  } else {
    content.classList.add('open');
    content.style.display = 'block';
    button.textContent = 'Tutup';
  }
}

// Fungsi preview PDF
function showPreview(button) {
  event.preventDefault();

  const url = button.getAttribute('data-pdf-url');
  const previewContainer = button.nextElementSibling;

  const isVisible = previewContainer.style.display === 'block';

  if (!isVisible) {
    previewContainer.innerHTML = `<iframe src="${url}" width="100%" height="480" frameborder="0" allow="autoplay"></iframe>`;
    previewContainer.style.display = 'block';
    button.textContent = 'Tutup Surat';
  } else {
    previewContainer.innerHTML = '';
    previewContainer.style.display = 'none';
    button.textContent = 'Preview Surat';
  }
}

// Dark mode toggle
function toggleDarkMode() {
  const body = document.body;
  const modeIcon = document.getElementById("modeIcon");

  body.classList.toggle("dark");

  modeIcon.textContent = body.classList.contains("dark") ? "🌕" : "🌑";
}

// Navigasi balik
function goBack() {
  window.location.href = "https://sadulursepoorid.github.io/Sadulursepoorid"; // ganti kalau perlu
}

// Pencarian & filter
function filterFiles() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const name = card.querySelector('.file-name').textContent.toLowerCase();
    const fileCategory = card.getAttribute('data-category');

    const matchSearch = name.includes(search);
    const matchCategory = category === 'all' || fileCategory === category;

    card.style.display = matchSearch && matchCategory ? '' : 'none';
  });
}

// Load arsip saat halaman selesai dimuat
window.addEventListener('DOMContentLoaded', loadArsip);