# CampusCare Backend API (Project 2 - DecodeLabs)

Simple Node.js + Express REST API for the CampusCare frontend. Uses in-memory
data (no database) — data resets when the server restarts. That's expected
for this stage of the project.

## How to run

1. Open this folder in a terminal.
2. Install dependencies (you need internet access for this step):
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. You should see:
   ```
   ✅ CampusCare backend running at http://localhost:5000
   ```
5. Open `http://localhost:5000` in your browser — you'll see a JSON list of
   all available endpoints.

## Available Endpoints

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| GET    | /api/notices               | Get all notices                       |
| GET    | /api/notices/:id           | Get one notice by id                  |
| POST   | /api/notices                | Create a new notice                   |
| DELETE | /api/notices/:id           | Delete a notice                       |
| GET    | /api/faculty                | Get all faculty members               |
| GET    | /api/faculty/:id            | Get one faculty member                |
| GET    | /api/attendance/:studentId  | Get attendance % for a student        |
| POST   | /api/attendance              | Mark attendance for a student         |
| GET    | /api/contact                 | View all submitted contact messages   |
| POST   | /api/contact                  | Submit the contact form               |

## Testing with curl (once server is running)

```bash
# Get all notices
curl http://localhost:5000/api/notices

# Add a new notice
curl -X POST http://localhost:5000/api/notices \
  -H "Content-Type: application/json" \
  -d '{"title":"Holiday Notice","content":"College closed on Monday"}'

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul","email":"rahul@test.com","subject":"Query","message":"Hello"}'

# Get attendance for a student
curl http://localhost:5000/api/attendance/S101
```

You can also test these visually using **Postman** or the **Thunder Client**
VS Code extension instead of curl — easier for a demo/viva.

## Connecting this to your existing frontend

In your `script.js`, replace the fake `alert("Message Sent Successfully!")`
logic in the contact form handler with a real fetch call, e.g.:

```javascript
fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message })
})
.then(res => res.json())
.then(data => {
    if (data.success) {
        alert(data.message);
        form.reset();
    } else {
        alert(data.message);
    }
})
.catch(err => alert("Could not reach server. Is it running?"));
```

Same pattern applies for fetching notices dynamically instead of hardcoding
them in the HTML.
