const Client = require("@replit/database");

async function addPoints(username, additionalPoints) {
  const client = new Client();
  const currentPoints = await client.get(username);
  const totalPoints = currentPoints ? currentPoints + additionalPoints : additionalPoints
  await client.set(username, totalPoints)
  console.log(`${username} points added. Total points ${totalPoints}.`)
  return totalPoints;
}
async function getPoints(username) {
  const client = new Client();
  const currentPoints = await client.get(username);
  const totalPoints = currentPoints ?? 0
  console.log(`${username} have total ${totalPoints}.`)
  return totalPoints;
}

module.exports = {addPoints, getPoints};