document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const historyList = document.getElementById("historyList");

  const totalFilesEl = document.getElementById("totalFiles");
  const totalSizeEl = document.getElementById("totalSize");
  const lastUploadEl = document.getElementById("lastUpload");
  const largestFileEl = document.getElementById("largestFile");

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");

    historyList.innerHTML = "";
    let totalSize = 0;
    let largest = 0;
    let lastUpload = "...";

    history.forEach(item => {
      const li = document.createElement("li");
      li.className = "bg-white p-2 rounded shadow text-sm flex justify-between items-center";

      li.innerHTML = `
        <span class="truncate max-w-[65%]">${item.originalname}</span>
        <a href="${item.url}" download class="text-blue-500 hover:underline text-sm">Download</a>
      `;
      historyList.appendChild(li);

      totalSize += item.size;
      lastUpload = new Date(item.time).toLocaleString();
      if (item.size > largest) largest = item.size;
    });

    totalFilesEl.textContent = `Total file: ${history.length}`;
    totalSizeEl.textContent = `Total ukuran: ${(totalSize / 1024 / 1024).toFixed(2)} MB`;
    lastUploadEl.textContent = `Upload terakhir: ${lastUpload}`;
    largestFileEl.textContent = `File terbesar: ${(largest / 1024 / 1024).toFixed(2)} MB`;
  };

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return alert("Pilih file dulu");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
        history.unshift({
          originalname: data.originalname,
          filename: data.filename,
          size: data.size,
          time: Date.now(),
          url: data.url
        });
        localStorage.setItem("uploadHistory", JSON.stringify(history.slice(0, 20)));
        loadHistory();
        fileInput.value = "";
      } else {
        alert("Upload gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat upload");
      console.error(err);
    }
  });

  loadHistory();
});
