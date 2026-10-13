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

// 02 — Satu-satunya fungsi yang membangun tampilan
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