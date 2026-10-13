"use strict";

let tasks = [];

const form = document.getElementById("task-form");
const inputJudul = document.getElementById("judul");
const inputMatkul = document.getElementById("matkul");
const inputDeadline = document.getElementById("deadline");
const errorEl = document.getElementById("error");
const filtersEl = document.getElementById("filters");
const listEl = document.getElementById("task-list");
const counterEl = document.getElementById("counter");
const emptyEl = document.getElementById("empty");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const judul = inputJudul.value.trim();
  const deadline = inputDeadline.value;

  if (judul.length < 3) {
    showError("Judul tugas minimal 3 karakter.");
    return;
  }
  if (!deadline) {
    showError("Deadline wajib diisi.");
    return;
  }

  showError("");
  tasks.push({
    id: Date.now(),
    judul,
    matkul: inputMatkul.value,
    deadline,
    selesai: false,
  });
  
  form.reset();
  inputJudul.focus();
  render();
});

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = message === "";
}

// 03 — Event delegation: satu listener di <ul> untuk semua item
listEl.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  const id = Number(item.dataset.id);

  if (event.target.closest(".hapus")) {
    tasks = tasks.filter((t) => t.id !== id);
    render();
  }
});

listEl.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  const item = event.target.closest("li");
  const task = tasks.find((t) => t.id === Number(item.dataset.id));
  if (task) {
    task.selesai = event.target.checked;
    render();
  }
});

function render() {
  const items = tasks.map((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    li.classList.toggle("selesai", t.selesai);

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.selesai;
    cb.setAttribute("aria-label", "Tandai selesai: " + t.judul);

    const info = document.createElement("div");
    info.className = "info";
    const judul = document.createElement("span");
    judul.className = "judul";
    judul.textContent = t.judul;
    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = t.matkul + " · deadline " + t.deadline;
    info.append(judul, meta);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "hapus";
    del.setAttribute("aria-label", "Hapus: " + t.judul);
    del.textContent = "✕";

    li.append(cb, info, del);
    return li;
  });
  listEl.replaceChildren(...items);
}

render();