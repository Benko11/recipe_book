import express from "express";
import Tag from "../models/TagSchema";

const tagRoutes = express.Router();

interface RequestBody {
    title: string;
}

tagRoutes.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.send(tags);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

tagRoutes.post("/", (req, res) => {
    addTag(req.body)
        .then((tag) => res.status(201).json(tag))
        .catch((err) => res.status(400).json(err));
});

tagRoutes.post("/multiple", async (req, res) => {
    try {
        const requestBody = req.body as RequestBody;
        const { title } = requestBody;
        const tags = title.split(",").map((item) => item.trim());
        const tagsObjects = tags.map((tag) => {
            return { title: tag };
        });

        const results: RequestBody[] = [];

        for (let tag of tagsObjects) {
            try {
                const result = await addTag(tag);
                results.push(result);
            } catch {}
        }
        res.json(results);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

tagRoutes.get("/:id", getTag, async (req, res: any) => {
    res.json(res.tag);
});

tagRoutes.delete("/:id", getTag, async (req, res: any) => {
    try {
        const result = await res.tag.remove();
        res.json({ message: "Tag deleted" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

async function addTag(requestBody: RequestBody) {
    try {
        const { title } = requestBody;
        const tag = await Tag.create({ title });
        return tag;
    } catch (err: any) {
        throw err.message;
    }
}

async function getTag(req: any, res: any, next: any) {
    let tag;

    try {
        tag = await Tag.findById(req.params.id);
        if (tag == null) {
            return res.status(404).json({ message: "Tag not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
    res.tag = tag;

    next();
}
export default tagRoutes;
