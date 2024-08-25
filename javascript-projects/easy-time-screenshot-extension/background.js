// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      // Get the ID of the active tab
      const tabId = tabs[0].id;

      if (message.action === "applyStyles") {
        // apply the styles
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"],
        });
        console.log("Content script injected to apply styles ");
      } else if (message.action === "removeStyles") {
        // Remove the styles
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: removeStyles,
        });
        console.log("styles removed from the active tab");
      }
    } else {
      console.error("No active tab found.");
    }
  });
});

// Function to remove styles
function removeStyles() {
  if (!document.querySelector(".ytp-chrome-bottom")) return;

  document.querySelector(".ytp-chrome-bottom").style.display = "block";
}
