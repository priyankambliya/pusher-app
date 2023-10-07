const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static('public'));

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1683424",
  key: "3f8324d245b73657b6ae",
  secret: "476f223767cdec0c3ae7",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

// Set up a route to trigger new messages
app.post('/message', (req, res) => {
    const { message } = req.body;
    console.log(message)
    // Trigger a 'chat' event on a Pusher channel
      pusher.trigger('chat', 'message', { message });

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}...`);
});
