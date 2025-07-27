const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Route für Instagram-Abfrage
app.get('/instagram/user/:username', async (req, res) => {
    const { username } = req.params;
    const sessionId = process.env.SESSION_ID; // Dein Instagram-Cookie

    try {
        const response = await axios.get(`https://www.instagram.com/${username}/?__a=1&__d=1`, {
            headers: {
                'Cookie': `sessionid=${sessionId}`,
                'User-Agent': 'Mozilla/5.0'
            }
        });
        const posts = response.data.graphql.user.edge_owner_to_timeline_media.edges;
        res.json(posts.map(post => ({
            caption: post.node.edge_media_to_caption.edges[0]?.node.text || '',
            url: `https://instagram.com/p/${post.node.shortcode}`
        })));
    } catch (error) {
        res.status(500).json({ error: 'Instagram-Daten konnten nicht geladen werden.' });
    }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));