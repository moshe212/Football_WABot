const schedule = require("node-schedule");
const { exec } = require("child_process");

// Define the restart command
const restartCommand = "npm run server"; // Change this according to your server restart command

// Schedule the restart task
const restartJob = schedule.scheduleJob("15 10 * * *", () => {
  // Execute the restart command
  exec(restartCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting server: ${error.message}`);
    } else {
      console.log("Server restarted successfully");
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
});
