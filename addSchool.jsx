import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!imageFile) return alert('Image is required');
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    formData.append('image', imageFile);

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const uploadData = await uploadRes.json();

    const schoolRes = await fetch('/api/addSchool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, image: uploadData.filename }),
    });

    if (schoolRes.ok) router.push('/showSchools');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
        {['name', 'address', 'city', 'state', 'contact', 'email_id'].map((field) => (
          <div key={field} style={{ marginBottom: '12px' }}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                {...register(field, { required: `${field} is required` })}
                style={{ marginLeft: '10px', width: '100%' }}
              />
            </label>
            {errors[field] && (
              <p style={{ color: 'red' }}>{errors[field]?.message}</p>
            )}
          </div>
        ))}
        <div style={{ marginBottom: '12px' }}>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit">Add School</button>
      </form>
    </div>
  );
}