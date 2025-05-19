export function showAlert(type, message) {
  // Remove existing alert if present
  const existingAlert = document.getElementById("custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create new alert container
  const alertOverlay = document.createElement("div");
  alertOverlay.id = "custom-alert";
  alertOverlay.className = "custom-alert-overlay";

  // Determine GIF based on alert type
  const gifUrl = type === "success"
    ? '../assets/gifs/Success.gif'
    : "../assets/gifs/Error.gif";

  // Create alert content
  const alertBox = document.createElement("div");
  alertBox.className = `custom-alert-box ${type}`;
  
  alertBox.innerHTML = `
    <button class="custom-alert-close" aria-label="Close alert">×</button>
    <img src="${gifUrl}" alt="${type}" class="custom-alert-icon" />
    <div class="custom-alert-content">
      <p class="custom-alert-title">${type === "success" ? "Success!" : "Error!"}</p>
      <p class="custom-alert-message">${message}</p>
    </div>
  `;

  // Add close functionality
  const closeButton = alertBox.querySelector('.custom-alert-close');
  closeButton.addEventListener('click', () => {
    alertOverlay.remove();
  });

  // Append elements
  alertOverlay.appendChild(alertBox);
  document.body.appendChild(alertOverlay);

  // Auto-dismiss after 10 seconds
  const timeoutId = setTimeout(() => {
    alertOverlay.remove();
  }, 10000);

  // Clean up timeout if manually closed
  alertOverlay._timeoutId = timeoutId;
}