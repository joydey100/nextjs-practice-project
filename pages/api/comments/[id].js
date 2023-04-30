import { comments } from "../../../data/comments";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const findComment = comments.find((item) => item.id == id);
    const index = comments.findIndex(
      (item) => parseInt(item.id) === findComment.id
    );

    comments.splice(index, 1);

    res.status(200).json({ message: "Deleted" });
  }
}
