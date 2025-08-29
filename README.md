# Match Analytics Lite — Starter Template

Welcome to the Match Analytics Lite 24-hour internship test.

## Goal (24 hours)
Build a minimal Match Analytics prototype for **one match**.
You implement backend (Spring Boot), frontend (Angular), and simple visualizations.
Keep it simple: focus on correctness, meaningful charts, and documentation.

## Minimal requirements (must)
1. Implement the following backend endpoints:
   - GET /api/match  → returns a single match JSON (players + events)
   - POST /api/event → add an event (goal, pass, tackle)
   - GET /api/player/{id} → return player summary (goals, assists, formRating)

2. Frontend: single "Match Dashboard" page with:
   - Players table (position, goals, assists, formRating)
   - A chart (bar chart or simple heatmap) showing events aggregated per player or zone
   - Event timeline list (chronological)

3. Seed data: use `seed/match.json` as initial data to implement GET /api/match.

4. README must include:
   - How to run the project (docker optional)
   - Which AI tools (if any) were used
   - Short explanation of the formRating formula and assumptions

## Seed data
See `seed/match.json` for a minimal example dataset.

## Submission
- Fork this repo via GitHub Classroom (you will receive a link).
- Push your implementation to your fork within **24 hours**.
- Document any incomplete parts in your README.

## Notes for reviewers
Keep the evaluation pragmatic: this is a 24h test. We prioritize:
- Working endpoints
- Meaningful visualization
- Clear README & commit history

Good luck!
