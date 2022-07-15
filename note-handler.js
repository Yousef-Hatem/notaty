function updateNotesTable(noteId, noteTitle) {
    let table = document.getElementById("notes-table");
    let rowCounnt = table.rows.length;
    while (--rowCounnt) {
        table.deleteRow(rowCounnt);
    }
    getNotes(noteTitle).then(data => {
        data.forEach(note => {
            let row = table.insertRow(1);
            let idAttribute = document.createAttribute("id");
            idAttribute.value = note["_id"];
            row.setAttributeNode(idAttribute);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = note["title"];
            cell2.innerHTML = note["content"];
            note["updatedDate"] = new Date(note["updatedDate"]);
            note["updatedDate"] = note["updatedDate"].getFullYear() + "-" + note["updatedDate"].getMonth() + "-" + note["updatedDate"].getDate() + " " + note["updatedDate"].getHours() + ":" + note["updatedDate"].getMinutes() + ":" + note["updatedDate"].getSeconds();
            cell3.innerHTML = note["updatedDate"];
            cell4.innerHTML = `<a onclick="openEditModal('${note["_id"]}')" href="#"><img src="images/edit.png" width="22"></a>
                               <a onclick="confirmDeleteNote('${note["_id"]}')" href="#"><img src="images/delete.png" width="22"></a>`
        });
    }).then(() => {
        if (noteId) {
            let row = document.getElementById(noteId);
            row.setAttribute("style", "animation: new-row 5s;");
        }
    })
}

function searchNotes() {
    const searchTitle = document.getElementById("searchInput").value;
    updateNotesTable(undefined, searchTitle);
}

function confirmDeleteNote(noteId) {
    let action = confirm("Are you sure you want to delete this note?");
    if (action) {
        deleteNote(noteId).then(() => {
            updateNotesTable();
        })
    }
}