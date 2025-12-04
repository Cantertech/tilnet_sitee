document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadApkBtn');
    let isDownloading = false; // Flag to track download state

    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            if (isDownloading) {
                return; // If a download is already in progress, do nothing
            }

            // Set downloading state
            isDownloading = true;
            downloadButton.disabled = true; // Disable the button
            downloadButton.classList.add('is-loading'); // Add a class for styling

            // Store original content to restore later (optional, if you need to revert)
            const originalButtonContent = downloadButton.innerHTML;

            // Change button content to indicate loading
            downloadButton.innerHTML = `
                <span class="spinner"></span>
                <span>Preparing Download...</span>
            `;

            // Start the download - fetch and create blob for better mobile support
            const downloadUrl = 'https://expo.dev/artifacts/eas/7sZhbDQYmiK3xFRvfSYAk5.apk';


            
            // Update button text while fetching
            downloadButton.innerHTML = `
                <span class="spinner"></span>
                <span>Downloading...</span>
            `;
            
            // Fetch the file and create a blob URL for direct download
            fetch(downloadUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    // Create a blob URL
                    const blobUrl = window.URL.createObjectURL(blob);
                    
                    // Create a temporary anchor element
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'Tilnet.apk';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    
                    // Trigger the download
                    link.click();
                    
                    // Clean up
                    setTimeout(() => {
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(blobUrl);
                    }, 100);
                    
                    // Re-enable button after download starts
                    setTimeout(() => {
                        isDownloading = false;
                        downloadButton.disabled = false;
                        downloadButton.classList.remove('is-loading');
                        downloadButton.innerHTML = originalButtonContent;
                    }, 2000);
                })
                .catch(error => {
                    console.error('Download failed:', error);
                    // Fallback to direct link if fetch fails
                    window.open(downloadUrl, '_blank');
                    
                    // Re-enable button
                    isDownloading = false;
                    downloadButton.disabled = false;
                    downloadButton.classList.remove('is-loading');
                    downloadButton.innerHTML = originalButtonContent;
                });

            console.log('Download button clicked, attempting to download APK.');
        });
    }

    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
