import "@johnlindquist/kit";

// Name: My GitHub Repositories
// Shortcut: CMD 3

const pat = await env("GITHUB_TOKEN");
let { Octokit } = await npm("octokit");

// Authenticate to GitHub
const octokit = new Octokit({
  auth: pat,
});

// Determine authenticated login/owner
const {
  data: { login: owner },
} = await octokit.rest.users.getAuthenticated();

// Get all repos since 2020
const { data: repositories } = await octokit.request(
  "GET /user/repos?affiliation={affiliation}&per_page={perPage}&since={since}&sort={sort}",
  {
    affiliation: "owner",
    perPage: 100,
    since: "2020-01-01T00:00:00Z",
    sort: "updated",
  }
);

// Create a selectable list, and open the selected repo in the browser
let url = await arg(
  "Your repositories:",
  repositories.map(({ name, description, html_url }) => {
    return {
      name,
      description: html_url,
      value: html_url,
      preview: async () => {
        try {
          const { data: readmeInfo } = await octokit.request(
            "GET /repos/{owner}/{repo}/readme",
            {
              owner,
              repo: name,
            }
          );

          try {
            const { data: readmeContent } = await octokit.request(
              `GET ${readmeInfo["download_url"]}`
            );
            return md(readmeContent);
          } catch {
            return md(`Downloading the README for repo '${repoName}' failed`);
          }
        } catch {
          return md("No information available");
        }
      },
    };
  })
);

await $`open ${url}`;
