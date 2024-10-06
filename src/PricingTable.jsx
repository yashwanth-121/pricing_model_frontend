import  { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const PricingTable = ({structuredData}) => {
  // JSON string as provided
 

  // State to hold the parsed data
  const [data, setData] = useState([]);
  useEffect(() => {
    // Parse the JSON string and store in state
    const parsedData = JSON.parse(structuredData);
    setData(parsedData);
  }, []);
  if(structuredData === '') return ""

  return (
    <div>
      <h1>Structured Data Table</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Original Price</th>
            <th>Cost Price</th>
            <th>Predicted Price</th>
            <th>Optimized Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item["Original Price"]}</td>
              <td>{item["Cost Price"]}</td>
              <td>{item["Predicted Price"]}</td>
              <td>{item["Optimized Price"]}</td>
              <td>{item["Discount"]}</td>
              <td>{item["Quantity"]}</td>
              <td>{item["Profit"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default PricingTable;
