from flask import Flask, render_template

app = Flask(__name__)

# Edit BLOG text here (title, excerpt, date, and content paragraphs).
POSTS = [
    {
        "slug": "announcing-waia",
        "date": "January 21, 2026",
        "title": "Announcing Waterloo AI Association (WAIA)",
        "excerpt": "I’m excited to announce that I’m starting the Waterloo AI Association (WAIA) this fall...",
        "content": [
            "I’m excited to announce that I’m starting the Waterloo AI Association (WAIA) this fall.",
            "Our mission is to build a community around responsible AI development — bridging technical work and governance.",
            "Stay tuned for our first event!"
        ]
    }
]

# Edit PROJECT cards here (title, desc, tags).
PROJECTS = [
    {"title": "Minimalist OS", "desc": "A small systems project exploring low-level concepts.", "tags": ["Systems", "C", "Assembly"], "link": "#"},
    {"title": "Governance Framework Analysis", "desc": "Comparing governance frameworks and their tradeoffs.", "tags": ["Policy", "Governance", "Writing"], "link": "#"},
    {"title": "AI Safety Research", "desc": "Reading + writing on alignment and evaluation.", "tags": ["AI", "Research", "Safety"], "link": "#"},
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS)


@app.route("/blog")
def blog():
    return render_template("blog.html", posts=POSTS)


@app.route("/blog/<slug>")
def post(slug):
    post = next((p for p in POSTS if p["slug"] == slug), None)
    if not post:
        return "Post not found", 404
    return render_template("post.html", post=post)


if __name__ == "__main__":
    app.run(debug=True)