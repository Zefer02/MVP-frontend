import React, { useState } from 'react';
import axios from 'axios';

type Post = {
  id: number;
  content: string;
  wallet_address: string;
  timestamp: string;
};

const PostCard = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState('');

  const likePost = async (postId: number) => {
    try {
      await axios.post(`http://localhost:3001/posts/${postId}/like`, {
        wallet_address: '0x123...', // 🔁 Replace with actual wallet address
      });
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  const commentPost = async (postId: number) => {
    try {
      await axios.post(`http://localhost:3001/posts/${postId}/comment`, {
        wallet_address: '0x123...', // 🔁 Replace with actual wallet address
        content: comment,
      });
      setComment(''); // Clear input after comment
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <p className="text-sm text-gray-600">{post.wallet_address}</p>
      <p className="mt-1">{post.content}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(post.timestamp).toLocaleString()}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => likePost(post.id)}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Like
        </button>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border px-2 py-1 rounded w-1/2"
          placeholder="Add a comment"
        />
        <button
          onClick={() => commentPost(post.id)}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
