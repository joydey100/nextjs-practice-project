import { useState } from "react";

const AllComment = ({ comments }) => {
  const [value, setValue] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/comments`);
    const data = await response.json();
    setAllComments(data);
  };

  const handleSubmit = async () => {
    if (value.length === 0) {
      alert(`Please add your comment`);
      return;
    }
    const response = await fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = response.json();
    fetchData();
    console.log(data);
  };

  const deleteComment = async (id) => {
    const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE",
    });
    // show filtered comment
    let filteredComment = allComments.filter((comment) => comment.id !== id);
    setAllComments(filteredComment);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}> Submit Comment </button>
      <h2>All Comments</h2>
      {allComments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>
              {comment.id}. {comment.text}{" "}
            </p>
            <button onClick={() => deleteComment(comment.id)}> Delete </button>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/comments`);
  const data = await response.json();
  return {
    props: {
      comments: data,
    },
  };
};

export default AllComment;
