import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/getSchools')
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Schools</h1>
      <div className="grid">
        {schools.map((s) => (
          <div key={s.id} className="card">
            <Image
              src={`/schoolImages/${s.image}`}
              alt={s.name}
              width={200}
              height={150}
            />
            <h3>{s.name}</h3>
            <p>
              {s.address}, {s.city}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .card {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}