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




  <body>
  <div class="resume">
      <div class="profile-pic">
      <img src="${siswa.photo_profile}" alt="${siswa.nama}">
  </div>
  <h1>${siswa.nama}</h1>
    <hr>
  <div class="section">
      <h2">KATA-KATA</h2>
      <p> To impart my knowledge and serving skills earned through extensive trainings and experiences and further develop myself in being a part of the company.</p>
    </div>
  <hr>
  <div class="section">
    <h2">PERSONAL INFORMATION</h2>
      <p><strong>Nama Panggilan:</strong> ${siswa.nama_panggilan}</p>
      <p><strong>Tanggal Lahir:</strong> ${siswa.tanggal_lahir}</p>
      <p><strong>Tempat Lahir:</strong> ${siswa.tempat_lahir}</p>
      <p><strong>Alamat Email:</strong> ${siswa.alamat_email}</p>
      <p><strong>Place Of Birth:</strong> </p>
      <p><strong>Civil Status:</strong> Single</p> 
      <p><strong>Religion:</strong> Roman Catholic</p>
      <p><strong>Nationality:</strong> Filipino</p>
    </div>
  <hr>
  <div class="section">
    <h2">CONTACT</h2>
      <p><strong>Cellphone Number:</strong> 09102949352</p>
      <p><strong>Email Address:</strong> afable.nicole.eccinfoodtech@gamail.com</p>
   </div>
  <hr>
  <div class="section">
  <h2>EDUCATION</h2>
      <p><strong>COLLEGE:</strong>
      <p>- Bachelor of Science and Industrial Technology Major in FoodTech (2nd year College) 2021-2023 |EARIST Eulogio "Amang" Rodriguez Institute of Science and Technology </p>
      <p><strong>SECONDARY:</strong>
      <p>- Information and Communication Technology | Philippine Technological Institute of Science Arts and Trade Inc. (Senior High). <p> -
  GMA, Cavite 2018-2020 Gen. Mariano Alvarez Technical High School (Junior High) #688 Brgy. Poblacion 1 Cong. Road GMA, Cavite 2012-2018</p>
  
      <p><strong>PRIMARY:</strong>
      <p>- San. Gabriel 1. Elementary School Barangay Dacon, GMA, Cavite Year Graduated - 2014 </p>
  </div>
  <hr>
  <div class="section">
    <h2">WORK EXPERIENCE</h2>
      <p><strong>Company Name:</strong> Celeraise Electronics Corporation </p>
      <p><strong>Date:</strong> September 8, 2020-May 16, 2021
      <p><strong>Company Location:</strong> Maguyam Silang, Cavite Production Machine Operator</p>
  
      </div>
    </body>
  </html>
  






  
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
    <p>
      ${renderPendidikan(siswa.riwayat_pendidikan)}
    </p>
  </div>
  <div class="info">
    <label>Prestasi Akademik:</label>
    <p>
      ${renderList(siswa.prestasi_akademik)}
    </p>
  </div>
  <div class="info">
    <label>Aktivitas Ekstrakurikuler:</label>
    <p>
      ${renderList(siswa.aktivitas_ekstrakurikuler)}
    </p>
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