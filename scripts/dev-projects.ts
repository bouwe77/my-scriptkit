// Name: dev projects

import "@johnlindquist/kit";

let flags = {
  open: {
    name: "Open in VS Code",
    shortcut: "cmd+o",
  },
  repo: {
    name: "Open GitHub repo",
    shortcut: "cmd+g",
  },
  //   update: {
  //     name: "Update dependencies",
  //     shortcut: "cmd+d",
  //   },
};

const devProjects = await readdir(home("dev"));

let selectedProject = await arg(
  { placeholder: `Press 'right' to see menu`, flags },
  devProjects.map((name) => ({
    name,
    value: {
      path: home("dev", name),
      name,
    },
    description: home("dev", name),
  }))
);

if (flag?.open) {
  edit(selectedProject.path);
} else if (flag?.repo) {
  await browse("https://github.com/bouwe77/" + selectedProject.name);
  //} else if (flag?.update) {
  //TODO... copy(selectedProject.name);
} else {
  console.log(selectedProject);
}
