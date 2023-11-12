import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

const port: number = 8080;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// Routes required:
// create post, delete post, edit post (Simon)
// login / register, get posts, toggle claimed (Nitya)

app.post("/toggle-claimed", async (req, res) => {
    // TODO: toggle claimed with firebase.
});

app.delete("/delete/:id", async (req, res) => {
    // TODO: delete with firebase
});

app.put("/edit/:id", async (req, res) => {
    // TODO: edit with firebase
});

app.post("/login", async (req, res) => {
    // TODO: login with firebase
});

app.post("/register", async (req, res) => {
    // TODO: register with firebase
});

app.get("/get", async (req, res) => {
    let offset = req.query.offset ?? 0;
    let amount = req.query.amount ?? 20;

    // TODO: get with this information, sort by date
});
