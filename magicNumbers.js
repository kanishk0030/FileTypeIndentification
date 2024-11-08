const fileInput = document.getElementById('fileInput');
const fileExtensionDiv = document.getElementById('fileExtension');
const magicNumberResultDiv = document.getElementById('magicNumberResult');

// Known magic numbers for file type identification
const magicNumbers = {
    '89504E47': 'PNG',
    'FFD8FFE0': 'JPEG',
    '25504446': 'PDF',
    '504B0304': 'ZIP',
    '49492A00': 'TIFF'
};

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        // Method 1: File Extension Detection
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        fileExtensionDiv.textContent = `File type by extension: .${fileExtension}`;
        fileExtensionDiv.classList.add('show');

        // Method 2: Magic Number Detection
        const reader = new FileReader();
        reader.onloadend = function(event) {
            if (event.target.readyState === FileReader.DONE) {
                const arrayBuffer = new Uint8Array(event.target.result);
                const hexString = Array.from(arrayBuffer)
                    .slice(0, 4) // Read the first 4 bytes
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('')
                    .toUpperCase();
                
                // Check against known magic numbers
                const detectedType = magicNumbers[hexString] || 'Unknown';
                magicNumberResultDiv.textContent = `File type by magic number: ${detectedType}`;
                magicNumberResultDiv.classList.add('show');
            }
        };
        reader.readAsArrayBuffer(file.slice(0, 4));
    } else {
        fileExtensionDiv.textContent = "No file selected";
        magicNumberResultDiv.textContent = "";
        fileExtensionDiv.classList.remove('show');
        magicNumberResultDiv.classList.remove('show');

    }
});