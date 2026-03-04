const express = require("express");
const app = express();

let requestCount = 0;

app.get("/ping", async (req, res) => {

    requestCount++;

    const delay = Math.floor(Math.random() * 200) + 50; // 50-250 ms

    await new Promise(resolve => setTimeout(resolve, delay));

    res.json({
        message: "pong",
        time: new Date().toISOString(),
        delay: delay,
        totalRequests: requestCount
    });
});

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Node Test Server</title>
        </head>
        <body>
            <h1>Node.js Test Server</h1>
            <button onclick="ping()">Wyślij request</button>
            <pre id="output"></pre>

            <script>
                function ping() {
                    fetch("/ping")
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById("output").innerText =
                            "Message: " + data.message + "\\n" +
                            "Time: " + data.time + "\\n" +
                            "Delay: " + data.delay + "ms\\n" +
                            "Total Requests: " + data.totalRequests;
                    });
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server działa na http://localhost:3000");
});
