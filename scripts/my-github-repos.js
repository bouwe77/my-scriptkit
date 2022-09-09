import "@johnlindquist/kit";

// Name: My GitHub Repositories
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
const response = await octokit.request(
  "GET /user/repos?affiliation={affiliation}&per_page={perPage}&since={since}&sort={sort}",
  {
    affiliation: "owner",
    perPage: 100,
    since: "2020-01-01T00:00:00Z",
    sort: "updated",
  }
);

// inspect(response.data);

// Create a selectable list, and open the selected repo in the browser
let url = await arg(
  "Your repositories:",
  response.data.map(({ name, description, html_url }) => {
    return {
      name,
      description: html_url,
      value: html_url,
      preview: () => {
        //TODO make preview async and request the readme
        return md(`# ${name}\n${description || ""}`);
      },
    };
  })
);

await $`open ${url}`;
