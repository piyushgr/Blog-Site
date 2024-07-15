import { Alert, Button, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [slug, setSlug] = useState("");
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          content,
          image,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError("Duplicate title. Please select a unique title.");
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
        // Clear form data and image URL after successful submission
        setTitle("");
        setContent(""); // Clear content state
        setCategory("uncategorized"); // Clear category state
        setImage(""); // Clear image URL state
      }
    } catch (error) {
      setPublishError("Failed to publish post. Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="uncategorized">Select a Category</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
          <option value="freelance">Freelance</option>
          <option value="other">Other</option>
        </Select>
        <TextInput
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update image state
        />
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-72 object-cover mt-4"
          />
        ) : (
          <></>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something amazing..."
          className="h-72 mb-12"
          required
          value={content}
          onChange={(value) => setContent(value)}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Publish Post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
