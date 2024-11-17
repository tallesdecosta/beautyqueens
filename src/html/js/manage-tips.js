document.addEventListener('DOMContentLoaded', () => {
    const editModal = document.createElement('div');
    editModal.id = 'editModal';
    editModal.style.display = 'none';
    editModal.innerHTML = `
        <div class="modal-content">
            <h3>Edit Tip</h3>
            <textarea id="editTipContent"></textarea>
            <div>
                <button id="saveTip">Save</button>
                <button id="cancelEdit">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(editModal);

    const modalContent = document.querySelector('#editModal .modal-content');
    modalContent.style.width = '300px';
    modalContent.style.margin = '100px auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #ddd';
    modalContent.style.backgroundColor = '#fff';

    const modalOverlay = editModal;
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalOverlay.style.display = 'none';

    loadTips();

    async function loadTips() {
        const response = await fetch('../php/tip/manage-tips.php', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.tips && data.tips.length > 0) {
                const tableBody = document.querySelector('#tipsTable tbody');
                tableBody.innerHTML = ''; 

                data.tips.forEach(tip => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${tip.tip}</td>
                        <td>
                            <button class="editBtn" data-id="${tip.id}">&#9998; Edit</button>
                            <button class="deleteBtn" data-id="${tip.id}">❌ Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                document.querySelectorAll('.editBtn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const tipId = event.target.getAttribute('data-id');
                        const tipText = event.target.parentNode.parentNode.firstChild.textContent;
                        showEditModal(tipId, tipText);
                    });
                });

                document.querySelectorAll('.deleteBtn').forEach(button => {
                    button.addEventListener('click', async (event) => {
                        const tipId = event.target.getAttribute('data-id');
                        if (confirm('Are you sure you want to delete this tip?')) {
                            const response = await fetch('../php/tip/manage-tips.php', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: tipId }),
                                credentials: 'include'
                            });

                            const result = await response.json();

                            if (result.success) {
                                alert('Tip deleted successfully!');
                                loadTips();
                            } else {
                                alert('Failed to delete the tip.');
                            }
                        }
                    });
                });

            } else {
                alert('No tips found.');
            }
        } else {
            alert('Failed to load tips.');
        }
    }

    function showEditModal(tipId, tipText) {
        const editModal = document.getElementById('editModal');
        editModal.style.display = 'block';
        document.getElementById('editTipContent').value = tipText;

        const saveButton = document.getElementById('saveTip');
        const cancelButton = document.getElementById('cancelEdit');

        saveButton.onclick = async () => {
            const updatedTip = document.getElementById('editTipContent').value;
            const response = await fetch('../php/tip/manage-tips.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: tipId, tip: updatedTip }),
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                alert('Tip updated successfully!');
                loadTips();
                editModal.style.display = 'none';
            } else {
                alert('Failed to update the tip.');
            }
        };

        cancelButton.onclick = () => {
            editModal.style.display = 'none';
        };
    }
});
