import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const startDate = moment("2024-08-05");
const endDate = moment("2025-08-01");
const totalDays = endDate.diff(startDate, "days");

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const randomOffset = random.int(0, totalDays);
  const commitDate = moment(startDate).add(randomOffset, "days").format();

  const data = { date: commitDate };
  console.log(commitDate);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(commitDate, { "--date": commitDate }, makeCommits.bind(this, --n));
  });
};

makeCommits(500);
