import "@johnlindquist/kit";

// Name: Join Google Meet
// Description: Joins the Google Meet URL by opening it in the browser and clicking "Join"

// IMPORTANT: This script uses AppleScript to interact with the Google Meet page,
// so be sure to enable AppleScript in Chrome:
// View -> Developer -> Allow JavaScript from Apple Events

const meetUrl = await env("MEET_URL", async () => {
  const urlToSave = await arg("Enter URL to Google Meet");
  return urlToSave;
});

await browse(meetUrl);

// wait ~2 seconds for page to load before sending the click
await wait(2000);

// To click the "Join" button in the DOM, we search by a pretty obscure, but constant name:
const buttonName = "Qx7uuf";
const js = `document.querySelector('[jsname=\\"${buttonName}\\"]').click();`;

// Execute the JS to click the button on the active tab with AppleScript
await applescript(`
  tell application "Google Chrome" to tell window 1
      execute active tab javascript "${js}"
  end tell
`);
