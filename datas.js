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


  <div class="container-tnd">
  <div class="absen"><h1>NO 01</h1></div>
  <div class="absen-right"><h1>XII</h1></div>
  </div>




  <div class="resume">
  <div class="profile-pic">
    <img src="${siswa.photo_profile}" alt="${siswa.nama}">
  </div>
 

  <div class="section-kta">
      <p> To impart my knowledge and serving skills earned through extensive trainings and experiences and further
        develop myself in being a part of the company.</p>
  </div>
  <hr>

  <div class="section">
    <p><strong>Nama Panggilan:</strong> ${siswa.nama_panggilan}</p>

    
    <h2>Informasi Siswa</h2>
    <p><strong>Nama:</strong> ${siswa.nama}</p>
    <p><strong>Tanggal Lahir:</strong> ${siswa.tanggal_lahir}</p>
    <p><strong>Tempat Lahir:</strong> ${siswa.tempat_lahir}</p>
    <p><strong>Alamat Saat Ini:</strong> ${siswa.alamat_saat_ini}</p>
    <p><strong>Alamat Email:</strong> ${siswa.alamat_email}</p>
    <hr>
    <h2>Riwayat Pendidikan</h2>

        <p><strong>Nama Sekolah:</strong> ${siswa.riwayat_pendidikan[0].nama_sekolah}</p>
        <p><strong>Tingkat Pendidikan:</strong> ${siswa.riwayat_pendidikan[0].tingkat_pendidikan}</p>
        <p><strong>Tahun Kelulusan:</strong> ${siswa.riwayat_pendidikan[0].tahun_kelulusan}</p>

        <p><strong>Nama Sekolah:</strong> ${siswa.riwayat_pendidikan[1].nama_sekolah}</p>
        <p><strong>Tingkat Pendidikan:</strong> ${siswa.riwayat_pendidikan[1].tingkat_pendidikan}</p>
        <p><strong>Tahun Kelulusan:</strong> ${siswa.riwayat_pendidikan[1].tahun_kelulusan}</p>
        <hr>
    <h2>Prestasi Akademik</h2>

      <p>${siswa.prestasi_akademik[0]}</p>
      <p>${siswa.prestasi_akademik[1]}</p>


    <h2>Aktivitas Ekstrakurikuler</h2>
  
      <p>${siswa.aktivitas_ekstrakurikuler[0]}</p>
      <p>${siswa.aktivitas_ekstrakurikuler[1]}</p>

    <h2>Rencana Masa Depan</h2>
    <p>${siswa.rencana_masa_depan}</p>

  </div>
  <hr>

  
  






 

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