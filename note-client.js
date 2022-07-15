const baseUrl = "https://notaty.herokuapp.com";

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}

async function updateNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}

async function deleteNote(noteid) {
    const response = await fetch(`${baseUrl}/notes/${noteid}`, {
        method: "DELETE"
    });
    return response;
}

async function getNoteById(noteid) {
    const response = await fetch(`${baseUrl}/notes/${noteid}`);
    return response.json();
}

async function getNotes(noteTitle) {
    let url = `${baseUrl}/notes`;
    if (noteTitle) {
        url += `/?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();
}