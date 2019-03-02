const Promise = require("bluebird");
const Sandbox = require("sandbox");

let execute = (code, tests) => {
  const s = new Sandbox();
  s.options.timeout = 2000;
  return new Promise((resolve, reject) => {
    s.run(`${code}; ${tests}`, output => {
      if (output.result.charAt(0) === "[") resolve(output.result);
      else reject(output.result);
    });
  });
};

module.exports.execute = execute;
