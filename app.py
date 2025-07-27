from flask import Flask, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/instagram/user/<username>')
def get_instagram_posts(username):
    session_id = os.getenv("SESSION_ID")  # Holt die Session-ID aus Render
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": f"sessionid={session_id}"
    }
    try:
        # Neue Instagram-API-URL (funktioniert besser)
        url = f"https://www.instagram.com/api/v1/users/web_profile_info/?username={username}"
        response = requests.get(url, headers=headers)
        data = response.json()
        posts = data["data"]["user"]["edge_owner_to_timeline_media"]["edges"]
        return jsonify([post["node"] for post in posts])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
