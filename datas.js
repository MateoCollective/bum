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
    <p>"${siswa.kata_kata}"</p>
  `;
  return card;
}

// Tampilkan data lengkap siswa dalam modal
function showModal(siswa) {
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `



  <div class="resume">
  <div class="banner">
  <img class="banner-pic" src="${siswa.photo_profile}" alt="${siswa.nama}">
  </div>
    <div class="header">
      <img class="profile-pic" src="${siswa.photo_profile}" alt="${siswa.nama}">
      <div class="name">${siswa.nama}</div>
      <div class="contact-info">
        Email: nama.siswa@example.com<br>
        Telepon: 08123456789
      </div>
    </div>

    <div class="section">
    <h2>Informasi</h2>
    <div class="education">
      <p><strong>SMA XYZ</strong> - Jurusan Ilmu Pengetahuan Alam</p>
      <p>Nama: ${siswa.nama}</p>
  <p>Nama Panggilan: ${siswa.nama_panggilan}</p>
  <p>Tanggal Lahir: ${siswa.tanggal_lahir}</p>
  <p>Tempat Lahir: ${siswa.tempat_lahir}</p>
  <p>Alamat Saat Ini: ${siswa.alamat_saat_ini}</p>
  <p>Alamat Email: ${siswa.alamat_email}</p>
    </div>
  </div>

    <div class="section">
      <h2>Pendidikan</h2>
      <div class="education">
        <p><strong>SMA XYZ</strong> - Jurusan Ilmu Pengetahuan Alam</p>
        <p>Tahun Masuk: 2019</p>
        <p>Tahun Lulus: 2022</p>
      </div>
    </div>

    <div class="section">
      <h2>Prestasi Akademik</h2>
      <div class="achievements">
      <p>${siswa.prestasi_akademik[0]}</p>
      <p>${siswa.prestasi_akademik[1]}</p>
      </div>
    </div>

    <div class="section">
      <h2>Aktivitas Ekstrakurikuler</h2>
      <div class="activities">
      <p>${siswa.aktivitas_ekstrakurikuler[0]}</p>
    <p>${siswa.aktivitas_ekstrakurikuler[1]}</p>
      </div>
    </div>
    </div>

  








 

 

  
  






 

  `;
  const modal = document.getElementById('myModal');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Tutup modal saat tombol close diklik atau di luar modal
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  }
  window.onclick = function (event) {
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
  let listHTML = '<div>';
  list.forEach(item => {
    listHTML += `<p>${item}</p>`;
  });
  listHTML += '</div>';
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