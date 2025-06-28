function updateTotal() {
  let total = 0;

  document.querySelectorAll("input[type=checkbox]:checked").forEach((item) => {
    const harga = parseInt(item.value);
    const qty = parseInt(item.parentElement.querySelector(".qty-input")?.value) || 1;
    total += harga * qty;
  });

  document.getElementById("total").innerText = "Rp" + total.toLocaleString();
}

function orderNow() {
  const nama = document.getElementById("nama").value;
  const total = document.getElementById("total").innerText;

  if (nama === "") {
    alert("Masukkan nama dulu bro!");
    return;
  }

  let pesanan = "";
  let totalQty = 0;

  document.querySelectorAll("input[type=checkbox]:checked").forEach((item) => {
    const namaMenu = item.parentElement.querySelector(".menu-name")?.innerText || item.parentElement.querySelector("span")?.innerText;
    const qty = parseInt(item.parentElement.querySelector(".qty-input")?.value) || 1;
    totalQty += qty;
    pesanan += `- ${namaMenu} x${qty}<br>`;
  });

  if (pesanan === "") pesanan = "Belum pilih menu";

  document.getElementById("previewPesanan").innerHTML = `<strong>Nama:</strong> ${nama}<br><strong>Order:</strong><br>${pesanan}<br><strong>Total Item:</strong> ${totalQty}<br><strong>Total Harga:</strong> ${total}`;
  playSound("sound-pop");
  document.getElementById("previewModal").style.display = "block";
}

function tutupPreview() {
  document.getElementById("previewModal").style.display = "none";
}

function kirimWA() {
  const nama = document.getElementById("nama").value;
  const total = document.getElementById("total").innerText;

  let pesanan = "";
  let totalQty = 0;

  document.querySelectorAll("input[type=checkbox]:checked").forEach((item) => {
    const namaMenu = item.parentElement.querySelector(".menu-name")?.innerText || item.parentElement.querySelector("span")?.innerText;
    const qty = parseInt(item.parentElement.querySelector(".qty-input")?.value) || 1;
    totalQty += qty;
    pesanan += `- ${namaMenu} x${qty}%0A`;
  });

  if (pesanan === "") pesanan = "Belum pilih menu";

  const pesanWA = `Halo, saya ${nama}%0AOrder:%0A${pesanan}%0ATotal Item: ${totalQty}%0ATotal Harga: ${total}`;
  const noWA = "6282399183782";

  window.open(`https://wa.me/${noWA}?text=${pesanWA}`, "_blank");

  tutupPreview();
  resetForm(); // <-- tambahkan ini
}

function resetForm() {
  document.getElementById("nama").value = "";

  document.querySelectorAll("input[type=checkbox]").forEach((item) => {
    item.checked = false;
  });

  document.querySelectorAll(".qty-input").forEach((qty) => {
    qty.value = 1;
  });

  document.getElementById("total").innerText = "Rp0";
}

function playSound(soundId) {
  const audio = document.getElementById(soundId);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}
