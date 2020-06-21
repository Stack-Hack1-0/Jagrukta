const child_process = require("child_process");
const util = require("util");

child_process.exec = util.promisify(child_process.exec);

const detect = async (message) => {
  try {
    const res = await child_process.exec(
      `py ${__dirname}/fakepredict.py ${message}`
    );
    console.log(res["stdout"].trim() === "Fake");
    return res["stdout"].trim() === "Fake";
  } catch (er) {
    console.log(er);
  }
};

// detect("Photo of a vaccine developed by US scientists for COVID-19.");
module.exports = detect;
