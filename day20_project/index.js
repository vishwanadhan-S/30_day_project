

class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentNoteId = null;
        this.initializeElements();
        this.bindEvents();
        this.renderNotes();
    }

    initializeElements() {
        this.notesList = document.getElementById('notesList');
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.saveBtn = document.getElementById('saveNote');
        this.newBtn = document.getElementById('newNote');
        this.deleteBtn = document.getElementById('deleteNote');
        this.searchInput = document.getElementById('searchInput');
        this.noteTemplate = document.getElementById('noteTemplate');
    }

    bindEvents() {
        this.saveBtn.addEventListener('click', () => this.saveNote());
        this.newBtn.addEventListener('click', () => this.createNewNote());
        this.deleteBtn.addEventListener('click', () => this.deleteNote());
        this.searchInput.addEventListener('input', () => this.filterNotes());

       
        let saveTimeout;
        [this.noteTitle, this.noteContent].forEach(element => {
            element.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    if (this.currentNoteId) {
                        this.saveNote();
                    }
                }, 1000);
            });
        });
    }

    createNewNote() {
        this.currentNoteId = null;
        this.noteTitle.value = '';
        this.noteContent.value = '';
        this.updateActiveNote();
    }

    saveNote() {
        const title = this.noteTitle.value.trim();
        const content = this.noteContent.value.trim();

        if (!title && !content) {
            alert('Please enter a title or content for the note.');
            return;
        }

        const now = new Date();
        const noteData = {
            title: title || 'Untitled Note',
            content: content,
            lastModified: now.toISOString(),
            preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
        };

        if (this.currentNoteId) {
            
            const index = this.notes.findIndex(note => note.id === this.currentNoteId);
            if (index !== -1) {
                this.notes[index] = { ...this.notes[index], ...noteData };
            }
        } else {
           
            const newNote = {
                id: Date.now().toString(),
                ...noteData,
                created: now.toISOString()
            };
            this.notes.unshift(newNote);
            this.currentNoteId = newNote.id;
        }

        this.saveToLocalStorage();
        this.renderNotes();
        this.updateActiveNote();
    }

    deleteNote() {
        if (!this.currentNoteId) {
            alert('No note selected to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== this.currentNoteId);
            this.saveToLocalStorage();
            this.createNewNote();
            this.renderNotes();
        }
    }

    loadNote(noteId) {
        const note = this.notes.find(note => note.id === noteId);
        if (note) {
            this.currentNoteId = noteId;
            this.noteTitle.value = note.title;
            this.noteContent.value = note.content;
            this.updateActiveNote();
        }
    }

    updateActiveNote() {
      
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });

    
        if (this.currentNoteId) {
            const activeNote = document.querySelector(`[data-id="${this.currentNoteId}"]`);
            if (activeNote) {
                activeNote.classList.add('active');
            }
        }
    }

    filterNotes() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredNotes = this.notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm)
        );
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = null) {
        const notes = notesToRender || this.notes;

        if (notes.length === 0) {
            this.notesList.innerHTML = `
                        <div class="empty-state">
                            <h3>No notes yet</h3>
                            <p>Create your first note to get started!</p>
                        </div>
                    `;
            return;
        }

        this.notesList.innerHTML = '';
        notes.forEach(note => {
            const template = this.noteTemplate.content.cloneNode(true);
            const noteElement = template.querySelector('.note-item');

            noteElement.dataset.id = note.id;
            noteElement.querySelector('.note-title').textContent = note.title;
            noteElement.querySelector('.note-preview').textContent = note.preview || '';

            const date = new Date(note.lastModified);
            noteElement.querySelector('.note-date').textContent =
                date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            noteElement.addEventListener('click', () => this.loadNote(note.id));

            this.notesList.appendChild(template);
        });

        this.updateActiveNote();
    }

    saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});
