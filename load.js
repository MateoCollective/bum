
<div class="container" display="none">
<div class="left-section">
<img src="${siswa.photo_profile}" alt="${siswa.nama}">
<div class="quote"> 
<p> ${siswa.kata_kata}</p>
</div>
  <div class="contact-info">
    <ul>
      <li>Email: siswa@example.com</li>
      <li>No. Telepon: 1234567890</li>
      <li>Alamat: Jl. Contoh Alamat No. 123</li>
    </ul>
    <div class="social-media">
      <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
</div>
<div class="right-section">



<div class="section">
 

  
  <h2>Informasi Siswa</h2>
  <p>Nama: ${siswa.nama}</p>
  <p>Nama Panggilan: ${siswa.nama_panggilan}</p>
  <p>Tanggal Lahir: ${siswa.tanggal_lahir}</p>
  <p>Tempat Lahir: ${siswa.tempat_lahir}</p>
  <p>Alamat Saat Ini: ${siswa.alamat_saat_ini}</p>
  <p>Alamat Email: ${siswa.alamat_email}</p>
  <hr>
  <h2>Riwayat Pendidikan</h2>

      <p>Nama Sekolah: ${siswa.riwayat_pendidikan[0].nama_sekolah}</p>
      <p>Tingkat Pendidikan: ${siswa.riwayat_pendidikan[0].tingkat_pendidikan}</p>
      <p>Tahun Kelulusan: ${siswa.riwayat_pendidikan[0].tahun_kelulusan}</p>

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

</div>
</div>