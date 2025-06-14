const API_URL = "/upload";

const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const historyList = document.getElementById("historyList");

//
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  if (file.size > 128 * 1024 * 1024) {
    alert("Ukuran file terlalu besar (maksimal 128MB).");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload gagal");
    const data = await res.json();
    saveToHistory(data);
    loadHistory();
    fileInput.value = "";
  } catch (err) {
    alert("Gagal mengunggah file.");
  }
});

// 
function saveToHistory(data) {
  const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  data.uploadedAt = new Date().toISOString();
  history.unshift(data);
  localStorage.setItem("uploadHistory", JSON.stringify(history));
}

//
function loadHistory() {
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");

  const now = Date.now();
  const fiveHours = 5 * 60 * 60 * 1000;

  history = history.filter(file => {
    const uploadedAt = new Date(file.uploadedAt).getTime();
    return now - uploadedAt < fiveHours;
  });

  localStorage.setItem("uploadHistory", JSON.stringify(history));

  for (const file of history) {
    const li = document.createElement("li");
    li.className = "bg-white p-3 rounded shadow flex justify-between items-start";

    const uploadedAt = new Date(file.uploadedAt).getTime();
    const remainingMs = (uploadedAt + fiveHours) - now;
    const remaining = formatRemaining(remainingMs);

    li.innerHTML = `
      <div class="flex-1">
        <p class="font-medium">${file.originalname || "Tanpa nama"}</p>
        <a href="${file.url}" class="text-blue-500 text-sm break-all" target="_blank">${file.url}</a>
        <p class="text-xs text-gray-500">
          Ukuran: ${formatBytes(file.size || 0)} |
          Upload: ${formatDate(file.uploadedAt)}<br>
          ⏳ Sisa waktu: <span class="text-red-500 font-semibold">${remaining}</span>
        </p>
      </div>
      <button onclick="removeFromHistory('${file.url}')" class="text-red-500 hover:text-red-700 mt-1">
        <i data-lucide="trash-2"></i>
      </button>
    `;
    historyList.appendChild(li);
  }

  lucide.createIcons();
  updateStats();
}


function updateStats() {
  const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");

  const totalFiles = history.length;
  const totalSize = history.reduce((acc, f) => acc + (f.size || 0), 0);
  const lastUpload = history[0]?.uploadedAt || null;
  const largest = history.reduce((max, f) => f.size > max.size ? f : max, { size: 0 });

  document.getElementById('totalFiles').textContent = `Total file: ${totalFiles}`;
  document.getElementById('totalSize').textContent = `Total ukuran: ${formatBytes(totalSize)}`;
  document.getElementById('lastUpload').textContent = `Upload terakhir: ${lastUpload ? formatDate(lastUpload) : '-'}`;
  document.getElementById('largestFile').textContent = `File terbesar: ${largest.originalname || '-'} (${formatBytes(largest.size)})`;
}


function formatBytes(bytes) {
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID");
}

function formatRemaining(ms) {
  if (ms <= 0) return "expired";
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((ms % (1000 * 60)) / 1000);
  return `${h}j ${m}m ${s}d`;
}


function removeFromHistory(url) {
  const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  const updated = history.filter(file => file.url !== url);
  localStorage.setItem("uploadHistory", JSON.stringify(updated));
  loadHistory();
}


setInterval(loadHistory, 1000);


loadHistory();
