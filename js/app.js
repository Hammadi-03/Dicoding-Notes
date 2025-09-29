const notesData = [
  { id: 1, title: "Belajar HTML", body: "Mempelajari dasar-dasar HTML untuk struktur website." },
  { id: 2, title: "Belajar CSS", body: "Memahami styling dan layout dengan CSS." },
  { id: 3, title: "Belajar JavaScript", body: "Menguasai dasar-dasar JavaScript untuk interaktivitas." }
];

class NoteItem extends HTMLElement {
  set note(data) {
    this.innerHTML = `
      <div class="note-card">
        <h3>${data.title}</h3>
        <p>${data.body}</p>
      </div>
    `;
  }
}
customElements.define("note-item", NoteItem);
class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<slot></slot>`;
  }
}
customElements.define("app-bar", AppBar);
class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteForm">
        <input type="text" id="noteTitle" placeholder="Judul catatan" required>
        <textarea id="noteBody" placeholder="Isi catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const form = this.querySelector("#noteForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.querySelector("#noteTitle").value;
      const body = this.querySelector("#noteBody").value;
      const newNote = { id: Date.now(), title, body };
      notes.push(newNote);
      renderNotes();
      form.reset();
    });
  }
}
customElements.define("note-form", NoteForm);
const notesList = document.getElementById("notesList");
let notes = [...notesData];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;
    notesList.appendChild(noteElement);
  });
}

renderNotes();
