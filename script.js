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
                <span>Download Starting...</span>
            `;

            // Start the download
            window.location.href = 'https://github.com/Cantertech/tili/releases/download/tilnet/application-3c25d5f9-09e2-471f-8989-87c959b3a5ae.apk';

            console.log('Download button clicked, attempting to download APK.');

            // Optional: Re-enable the button after a short delay
            // This is useful if the download is very quick or if you
            // want to allow retries after a perceived failure.
            // For a direct file download via window.location.href, the user
            // leaves the page or the download starts in the background,
            // so re-enabling might not be strictly necessary immediately
            // unless you have a mechanism to detect download completion.
            setTimeout(() => {
                isDownloading = false;
                downloadButton.disabled = false;
                downloadButton.classList.remove('is-loading');
                downloadButton.innerHTML = originalButtonContent; // Restore original content
            }, 5000); // Re-enable after 5 seconds (adjust as needed)
        });
    }

    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});