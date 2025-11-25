// Get all elements
const allPagesCheckbox = document.getElementById('all-pages');
const pageCheckboxes = document.querySelectorAll('.page-checkbox');
const doneButton = document.getElementById('done-button');
const alertOverlay = document.getElementById('alert-overlay');
const alertContent = document.getElementById('alert-content');
const closeAlertButton = document.getElementById('close-alert');

allPagesCheckbox.addEventListener('change', function() {
    pageCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

pageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const allChecked = Array.from(pageCheckboxes).every(cb => cb.checked);
        allPagesCheckbox.checked = allChecked;
        
        if (!this.checked) {
            allPagesCheckbox.checked = false;
        }
    });
});

doneButton.addEventListener('click', function() {
    const selectedPages = [];
    
    if (allPagesCheckbox.checked) {
        selectedPages.push('All pages');
    } else {
        pageCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedPages.push(checkbox.value);
            }
        });
    }
    
    // Display alert
    showAlert(selectedPages);
});

function showAlert(selectedItems) {
    alertContent.innerHTML = '';
    
    if (selectedItems.length === 0) {
        alertContent.innerHTML = '<div class="empty-selection">No pages selected</div>';
    } else {
        selectedItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'selected-item';
            itemDiv.textContent = item;
            itemDiv.style.animationDelay = `${index * 0.05}s`;
            alertContent.appendChild(itemDiv);
        });
    }
    
    alertOverlay.classList.add('show');
}

closeAlertButton.addEventListener('click', function() {
    alertOverlay.classList.remove('show');
});

alertOverlay.addEventListener('click', function(e) {
    if (e.target === alertOverlay) {
        alertOverlay.classList.remove('show');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && alertOverlay.classList.contains('show')) {
        alertOverlay.classList.remove('show');
    }
});

