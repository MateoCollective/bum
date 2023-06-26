// Mengambil data siswa dari file JSON
async function fetchSiswaData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  }
  
  // Membuat elemen bubble chat
  function createBubbleChatElement(siswa, position) {
    const bubbleChat = document.createElement('div');
    bubbleChat.className = 'bubble-chat';
    bubbleChat.classList.add(position === 'left' ? 'left' : 'right');
    bubbleChat.innerHTML = `
      <div class="profile-bubble">
        <img src="${siswa.photo_profile}" alt="${siswa.nama}">
      </div>
      <div class="bubble-content">
        <h2>${siswa.nama}</h2>
        <p>${siswa.typing}</p>
      </div>
    `;
    return bubbleChat;
  }
  
  // Mengacak urutan data siswa
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Mengganti data siswa secara periodik dan acak
  async function changeSiswaData() {
    const siswaData = await fetchSiswaData();
    const keys = Object.keys(siswaData);
    const shuffledKeys = shuffleArray(keys);
    let currentIndex = 0;
  
    const containerLeft = document.getElementById('bubbleChatContainerLeft');
    const containerRight = document.getElementById('bubbleChatContainerRight');
  
    function updateBubbleChat() {
      const siswaLeft = siswaData[shuffledKeys[currentIndex]];
      const siswaRight = siswaData[shuffledKeys[(currentIndex + 1) % shuffledKeys.length]];
  
      const bubbleChatLeft = createBubbleChatElement(siswaLeft, 'left');
      const bubbleChatRight = createBubbleChatElement(siswaRight, 'right');
  
      containerLeft.innerHTML = '';
      containerLeft.appendChild(bubbleChatLeft);
  
      containerRight.innerHTML = '';
      containerRight.appendChild(bubbleChatRight);
  
      currentIndex = (currentIndex + 2) % shuffledKeys.length;
      if (currentIndex === 0) {
        shuffleArray(shuffledKeys); // Mengacak urutan kembali setelah mencapai akhir
      }
    }
  
    updateBubbleChat(); // Tampilkan data siswa saat halaman dimuat
  
    setInterval(updateBubbleChat, 5000); // Ganti data setiap 5 detik
  }
  
  // Inisialisasi
  async function initialize() {
    await changeSiswaData();
  }
  
  initialize();
  