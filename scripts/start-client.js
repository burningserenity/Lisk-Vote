const args = {"start"};
const opts = { stdio: "inherit", cwd: "client", shell: true};
require("child_process").spwan("npm", args, opts);
