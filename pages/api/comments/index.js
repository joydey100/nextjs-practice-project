import { comments } from "../../../data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(201).json(comments);
  }
  if (req.method === "POST") {
    const comment = req.body;
    const newComment = {
      id: Date.now(),
      text: comment,
    };
    comments.push(newComment);
    res.status(200).json(newComment);
  }
}
