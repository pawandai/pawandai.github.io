import { Calendar } from "lucide-react";
import { useEffect } from "react";

const ScheduleCall = () => {
  const handleClick = () => {
    // Create link element for the Calendly widget CSS (if not already present)
    if (
      !document.querySelector(
        "link[href='https://assets.calendly.com/assets/external/widget.css']"
      )
    ) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      const link2 = document.createElement("link");
      link2.href = "../../../app/globals.css";
      link2.rel = "stylesheet";
      document.head.appendChild(link2);
    }

    // Create script element for the Calendly widget JS (if not already present)
    if (
      !document.querySelector(
        "script[src='https://assets.calendly.com/assets/external/widget.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        // Initialize the Calendly popup widget once the script is loaded
        if (window.Calendly && window.Calendly.initPopupWidget) {
          window.Calendly.initPopupWidget({
            url: "https://calendly.com/contactpawandai/30min",
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // If script already loaded, initialize Calendly widget
      if (window.Calendly && window.Calendly.initPopupWidget) {
        window.Calendly.initPopupWidget({
          url: "https://calendly.com/contactpawandai/30min",
        });
      }
    }
  };

  useEffect(() => {
    // Add styles specifically for the Calendly widget popup
    const style = document.createElement("style");
    style.innerHTML = `
      /* Center the Calendly widget */
      .calendly-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 107vh;
        padding: 0;
      }
    `;
    document.head.appendChild(style);

    // Clean up styles on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 flex items-center justify-center mx-auto gap-2 w-[200px] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
    >
      Schedule a Call <Calendar />
    </button>
  );
};

export default ScheduleCall;
