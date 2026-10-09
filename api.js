document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    const loadBtn = document.getElementById("load-btn");
    const submitBtn = document.getElementById("submit-btn");
    const noteForm = document.getElementById("note-form");
    const titleInput = document.getElementById("title-input");
    const bodyInput = document.getElementById("body-input");
    const notesList = document.getElementById("notes-list");
    const statusP = document.getElementById("status");

    // Local array to manage notes UI state (handles JSONPlaceholder simulation limitation)
    let currentNotes = [];

    function setStatus(message, type) {
        statusP.textContent = message;
        statusP.className = `status-message ${type}`;
    }

    // Reusable async request function with error checking
    async function request(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (options.method === "DELETE") {
            return true; // DELETE responses are often empty (204 No Content)
        }
        return await response.json();
    }

    function renderNotes() {
        notesList.innerHTML = "";

        if (currentNotes.length === 0) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "empty-state";
            emptyLi.textContent = "No notes available.";
            notesList.appendChild(emptyLi);
            return;
        }

        currentNotes.forEach(note => {
            const li = document.createElement("li");
            li.className = "note-item";

            const contentDiv = document.createElement("div");
            contentDiv.className = "note-content";

            const h3 = document.createElement("h3");
            h3.textContent = note.title; // Safe from XSS

            const p = document.createElement("p");
            p.textContent = note.body || ""; // Safe from XSS

            contentDiv.appendChild(h3);
            contentDiv.appendChild(p);

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteNote(note.id, li));

            li.appendChild(contentDiv);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }

    // GET: Load 10 notes
    async function loadNotes() {
        loadBtn.disabled = true;
        setStatus("Loading notes...", "loading");

        try {
            const data = await request(`${API_URL}?_limit=10`);
            currentNotes = data;
            renderNotes();
            setStatus(`Loaded ${currentNotes.length} notes from the server.`, "success");
        } catch (error) {
            setStatus(`Failed to load notes: ${error.message}`, "error");
        } finally {
            loadBtn.disabled = false;
        }
    }

    // POST: Create a note
    async function createNote(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        // Validation
        if (!title) {
            setStatus("Validation error: Title is required.", "error");
            return;
        }
        if (title.length > 100) {
            setStatus("Validation error: Title must be 100 characters or fewer.", "error");
            return;
        }

        submitBtn.disabled = true;
        setStatus("Creating note...", "loading");

        try {
            const newNotePayload = { title, body, userId: 1 };
            const createdNote = await request(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNotePayload)
            });

            // Note: JSONPlaceholder simulates creation and returns id 101.
            // We prepend it to our local array so the user can see it immediately.
            currentNotes.unshift(createdNote);
            renderNotes();

            noteForm.reset();
            setStatus(`Note created (status 201, id ${createdNote.id}).`, "success");
        } catch (error) {
            setStatus(`Failed to create note: ${error.message}`, "error");
        } finally {
            submitBtn.disabled = false;
        }
    }

    // DELETE: Remove a note
    async function deleteNote(id, listItemElement) {
        const deleteButton = listItemElement.querySelector(".delete-btn");
        deleteButton.disabled = true;
        setStatus("Deleting note...", "loading");

        try {
            await request(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            // Remove locally
            currentNotes = currentNotes.filter(note => note.id !== id);
            renderNotes();
            setStatus(`Note ${id} successfully deleted.`, "success");
        } catch (error) {
            setStatus(`Failed to delete note: ${error.message}`, "error");
            deleteButton.disabled = false;
        }
    }

    loadBtn.addEventListener("click", loadNotes);
    noteForm.addEventListener("submit", createNote);
});