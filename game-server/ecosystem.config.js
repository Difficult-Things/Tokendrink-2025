const npmPath =
  process.platform === "win32"
    ? "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js"
    : "npm";

module.exports = {
  apps: [
    {
      name: "mqtt",
      script: npmPath,
      cwd: __dirname,
      args: "run start:mqtt",
      time: true,
      error_file: "./logs/mqtt-err.log",
      out_file: "./logs/mqtt-out.log",
    },
    {
      name: "data-watcher",
      script: npmPath,
      cwd: __dirname,
      args: "run start:data-watcher",
      time: true,
      error_file: "./logs/data-watcher-err.log",
      out_file: "./logs/data-watcher-out.log",
    },
    // {
    //   name: "dashboard",
    //   script: npmPath,
    //   cwd: __dirname,
    //   args: "run start:dashboard",
    //   time: true,
    //   error_file: "./logs/dashboard-err.log",
    //   out_file: "./logs/dashoard-out.log",
    // },
  ],
};
