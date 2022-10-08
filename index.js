const cli = require("./bin/cli");
const qa = require("./src/utils/qa");

// QA

const data = qa();
cli(data);
