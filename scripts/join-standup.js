import "@johnlindquist/kit";

// Name: Join Standup

const standUpMeetUrl = await env("STANDUP_MEET_URL", async () => {
  const urlToSave = await arg("Enter URL to standup meeting");
  return urlToSave;
});

await focusTab(standUpMeetUrl);
