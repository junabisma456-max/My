const express = require('express');
const app = express();
app.use(express.json());

let queue = [];
let processedIds = new Set();

app.post('/tiktok-event', (req, res) => {
    const comment = (req.body.comment || "").trim();
    const commentId = req.body.commentId || (req.body.user + "-" + comment);
    if (comment && !processedIds.has(commentId)) {
        if (/^[A-Za-z0-9_]{3,20}$/.test(comment)) {
            queue.push(comment);
            processedIds.add(commentId);
        }
    }
    res.sendStatus(200);
});

app.get('/queue', (req, res) => {
    res.json(queue);
    queue = [];
});

app.listen(process.env.PORT || 3000, () => console.log('Server aktif'));
