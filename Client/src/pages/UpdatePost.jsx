import { Alert, Button, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        setFormData(data.posts[0]);
      } catch (error) {
        setPublishError("Failed to fetch post details");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || "uncategorized"}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="freelance">Freelance</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <TextInput
          type="text"
          placeholder="Image URL"
          value={formData.image || ""}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover mt-4"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something amazing..."
          className="h-72 mb-12"
          value={formData.content || ""}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
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
