const fileInput = document.getElementById('fileInput');
    const fileExtensionDiv = document.getElementById('fileExtension');

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop();  // Get the file extension
            fileExtensionDiv.textContent = `File type is : .${fileExtension}`;
            fileExtensionDiv.classList.add('show');
        } else {
            fileExtensionDiv.textContent = "No file selected";
            fileExtensionDiv.classList.remove('show');
        }
    });