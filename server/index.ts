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
// login / register, get posts, create post (Simon)
// NOTE: login / register is frontend-only
// edit post, delete post, toggle claimed (Nitya)

app.get("/get", async (req, res) => {
    let offset = req.query.offset ?? 0;
    let amount = req.query.amount ?? 20;

    // TODO: get with this information, sort by date
});

app.post("/create", async (req, res) => {
    // TODO: create with firebase
});

app.delete("/delete/:id", async (req, res) => {
    // TODO: delete with firebase
});

app.put("/edit/:id", async (req, res) => {
    // TODO: edit with firebase
});

app.post("/toggle-claimed", async (req, res) => {
    // TODO: toggle claimed with firebase.
});
