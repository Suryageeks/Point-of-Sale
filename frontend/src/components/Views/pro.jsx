import React, { useState, useEffect } from 'react';

function Pro() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/v1/getproduct');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data && Array.isArray(data) && data.map((item,i) => (
        <div key={i}>
          <h2>{item.name}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );

}

export default Pro;
