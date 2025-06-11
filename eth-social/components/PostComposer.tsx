import React, { useState } from 'react';
import axios from 'axios';

const PostComposer = ({ onPost }: { onPost: (content: string) => void }) => {
  const [content, setContent] = useState('');

  const submitPost = async () => {
    if (!content.trim()) return;
    await axios.post('http://localhost:3001/posts', {
      content,
      wallet_address: '0x123...', // Replace with actual wallet later
    });
    onPost(content);
    setContent('');
  };

  return (
    <div className="p-4 border rounded mb-4">
      <textarea
        className="w-full border p-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded" onClick={submitPost}>
        Post
      </button>
    </div>
  );
};

export default PostComposer;
