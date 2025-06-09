import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

const ProfilePage = () => {
  const { address } = useAccount();
  const [form, setForm] = useState({ username: '', bio: '', profile_pic_url: '' });

  useEffect(() => {
    if (address) {
      axios.get(`http://localhost:3001/users/${address}`).then(res => {
        if (res.data) setForm(res.data);
      });
    }
  }, [address]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await axios.post('/api/users', { ...form, wallet_address: address });
    alert('Profile updated!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <input className="border p-2 mb-2 w-full" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input className="border p-2 mb-2 w-full" name="profile_pic_url" placeholder="Profile Picture URL" value={form.profile_pic_url} onChange={handleChange} />
      <textarea className="border p-2 mb-2 w-full" name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
      <button className="bg-blue-500 text-white p-2 w-full rounded" onClick={saveProfile}>
        Save
      </button>
    </div>
  );
};

export default ProfilePage;
