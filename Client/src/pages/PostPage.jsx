import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false); // Reset error state
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data.posts[0]);
      } catch (error) {
        setError(true);
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        setError(false); // Reset error state
        const res = await fetch(`/api/post/getposts?limit=3`);
        if (!res.ok) {
          throw new Error("Failed to fetch recent posts");
        }
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (error) {
        setError(true);
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    fetchRecentPosts();
  }, [postSlug]); // Run effect on postSlug change

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load post. Please try again.</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {post && (
        <>
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post.title}
          </h1>
          <Link
            to={`/search?category=${post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post.category}
            </Button>
          </Link>
          <img
            src={post.image}
            alt={post.title}
            className="mt-5 p-3 max-h-[600px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {(post.content.length / 1000).toFixed(0) === "0"
                ? "1"
                : (post.content.length / 1000).toFixed(0)}{" "}
              mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <CommentSection postId={post._id} />
        </>
      )}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-8">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
