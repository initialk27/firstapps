document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("list-container");
  const tambahBtn = document.getElementById("tambah-btn");

function renderList() {
  const data = JSON.parse(localStorage.getItem("catatanBulan")) || [];
  const listContainer = document.getElementById("list-container");
  const kosongMessage = document.getElementById("kosong-message");

  listContainer.innerHTML = "";

  if (data.length === 0) {
    kosongMessage.style.display = "block";
    return;
  } else {
    kosongMessage.style.display = "none";
  }

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "bulan-item";
    div.innerHTML = `
      <span>${item.bulan} ${item.tahun}</span>
      <div class="actions">
        <button onclick="hapusItem(${index})">🗑️</button>
        <button onclick="lanjut(${index})">Lanjut ➡️</button>
      </div>
    `;
    listContainer.appendChild(div);
  });
}


  let indexToDelete = null;

window.hapusItem = function(index) {
  indexToDelete = index;
  document.getElementById("confirm-modal").style.display = "flex";
};

document.getElementById("confirm-yes").addEventListener("click", function () {
  if (indexToDelete !== null) {
    const data = JSON.parse(localStorage.getItem("catatanBulan")) || [];
    data.splice(indexToDelete, 1);
    localStorage.setItem("catatanBulan", JSON.stringify(data));
    renderList();
    indexToDelete = null;
    document.getElementById("confirm-modal").style.display = "none";
  }
});

document.getElementById("confirm-no").addEventListener("click", function () {
  indexToDelete = null;
  document.getElementById("confirm-modal").style.display = "none";
});


window.lanjut = function(index) {
  localStorage.setItem("bulanTerpilih", index);
  window.location.href = "pengeluaran.html";
};


  tambahBtn.addEventListener("click", function () {
    window.location.href = "tambah.html";
  });

  renderList();
});

const data = localStorage.getItem('riwayatPengeluaran') || '';
const sizeInBytes = new Blob([data]).size;
console.log(`Ukuran: ${sizeInBytes} byte`);
