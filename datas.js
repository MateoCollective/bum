// Mengambil data siswa dari file JSON
async function fetchSiswaData() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}

// Render kartu siswa
function renderCards(data) {
  const gridContainer = document.getElementById('gridContainer');
  const cardLimit = 100; // Batasan jumlah card yang ditampilkan
  gridContainer.innerHTML = '';
  const keys = Object.keys(data);
  const slicedKeys = keys.slice(0, cardLimit); // Ambil hanya cardLimit jumlah card pertama
  slicedKeys.forEach(key => {
    const siswa = data[key];
    const card = createCardElement(siswa);
    card.addEventListener('click', () => showModal(siswa));
    gridContainer.appendChild(card);
  });
}

// Membuat elemen kartu siswa
function createCardElement(siswa) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${siswa.photo_profile}" alt="${siswa.nama}" class="profile-image">
    <h2>${siswa.nama}</h2>
    <p>${siswa.tanggal_lahir}</p>
  `;
  return card;
}

// Tampilkan data lengkap siswa dalam modal
function showModal(siswa) {
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `

  <div class="biodata-container">
  <h1>Biodata Siswa</h1>
  <div class="profile-pic">
    <img src="${siswa.photo_profile}" alt="${siswa.nama}">
  </div>
  <div class="info">
    <label>Nama:</label>
    <p>${siswa.nama}</p>
  </div>
  <div class="info">
    <label>Nama Panggilan:</label>
    <p>${siswa.nama_panggilan}</p>
  </div>
  <div class="info">
    <label>Tanggal Lahir:</label>
    <p>${siswa.tanggal_lahir}</p>
  </div>
  <div class="info">
    <label>Tempat Lahir:</label>
    <p>${siswa.tempat_lahir}</p>
  </div>
  <div class="info">
    <label>Alamat Saat Ini:</label>
    <p>${siswa.alamat_saat_ini}</p>
  </div>
  <div class="info">
    <label>Alamat Email:</label>
    <p>${siswa.alamat_email}</p>
  </div>
  <div class="info">
    <label>Nomor Telepon:</label>
    <p>${siswa.nomor_telepon}</p>
  </div>
  <div class="info">
    <label>Riwayat Pendidikan:</label>
    <ul>
      ${renderPendidikan(siswa.riwayat_pendidikan)}
    </ul>
  </div>
  <div class="info">
    <label>Prestasi Akademik:</label>
    <ul>
      ${renderList(siswa.prestasi_akademik)}
    </ul>
  </div>
  <div class="info">
    <label>Aktivitas Ekstrakurikuler:</label>
    <ul>
      ${renderList(siswa.aktivitas_ekstrakurikuler)}
    </ul>
  </div>
  <div class="info">
    <label>Rencana Masa Depan:</label>
    <p>${siswa.rencana_masa_depan}</p>
  </div>
</div>

  `;
  const modal = document.getElementById('myModal');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Tutup modal saat tombol close diklik atau di luar modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  modal.style.display = 'block';
}

// Render daftar pendidikan
function renderPendidikan(riwayat) {
  let pendidikanHTML = '';
  riwayat.forEach(item => {
    pendidikanHTML += `
      <p>
        Nama Sekolah: ${item.nama_sekolah}<br>
        Tingkat Pendidikan: ${item.tingkat_pendidikan}<br>
        Tahun Kelulusan: ${item.tahun_kelulusan}
      </p>
    `;
  });
  return pendidikanHTML;
}

// Render daftar prestasi dan aktivitas ekstrakurikuler
function renderList(list) {
  let listHTML = '<ul>';
  list.forEach(item => {
    listHTML += `<li>${item}</li>`;
  });
  listHTML += '</ul>';
  return listHTML;
}

// Inisialisasi tampilan awal
async function initialize() {
  const siswaData = await fetchSiswaData();
  renderCards(siswaData);

  // Tambahkan event listener untuk fitur pencarian siswa
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = {};
    Object.keys(siswaData).forEach(key => {
      const siswa = siswaData[key];
      const siswaNama = siswa.nama.toLowerCase();
      if (siswaNama.includes(searchTerm)) {
        filteredData[key] = siswa;
      }
    });
    renderCards(filteredData);
  });
}

initialize();
