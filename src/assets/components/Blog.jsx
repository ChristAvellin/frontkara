import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Les nouveaux talents de la musique béninoise à surveiller",
    summary: "A quick guide to building reusable UI components in React.",
    image: "blo1.jpg",
    author: "Admin",
    date: "2025-06-01",
  },
  {
    id: 2,
    title: "Top 10 des chansons béninoises qui font vibrer le pays en ce moment",
    summary:
      "Explore different ways to manage state in your React applications.",
    image: "blo2.jpg",
    author: "Admin",
    date: "2025-06-02",
  },
  {
    id: 3,
    title: "Ces chansons traditionnelles qui font leur retour",
    summary:
      "Learn how React Hooks simplify your code and improve reusability.",
    image: "blo3.jpg",
    author: "Admin",
    date: "2025-06-03",
  },
];

const BlogCard = ({ post }) => (
  <div
    style={{
      width: "300px",
      margin: "16px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <img
      src={post.image}
      alt={post.title}
      style={{ width: "100%", height: "180px", objectFit: "cover" }}
    />
    <div style={{ padding: "16px" }}>
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        {post.title}
      </h3>
      <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
        {post.summary}
      </p>
      <div
        style={{
          fontSize: "12px",
          color: "#999",
          marginTop: "12px",
          borderTop: "1px solid #eee",
          paddingTop: "8px",
        }}
      >
        By <strong>{post.author}</strong> • {post.date}
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "32px",
      backgroundColor: "#f9f9f9",
      minHeight: "80vh",
    }}
  >
    {blogPosts.map((post) => (
      <BlogCard key={post.id} post={post} />
    ))}
  </div>
);

export default Blog;
