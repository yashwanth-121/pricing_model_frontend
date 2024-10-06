import { useState } from 'react';
import './App.css'
import { Audio } from 'react-loader-spinner'
import useGemini from './utils.js';
import PricingTable from './PricingTable.jsx';


function App() {
  const [loading , setLoading] = useState(false)
  const [data, setData] = useState('')
  console.log(data)
 
  function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then(async (data) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const structuredData = await useGemini(`${data}. this is unstructured data. create an array of objects with the appropriate names given in the data and return just the array nothing else. It is very important to send just the array nothing else no naming the array. no nothing just the array of data thats all. It is mandatory to include all the data that is provided dont miss anything.Include all the data that is given to you. do not miss anything. Include every single object. include all the 60 objects data if they are present. give all the 60 values if they exist.`)
        console.log(structuredData)
        let finalData = ""
        if(structuredData.includes('```')){

          finalData = structuredData.split('json')[1].split('```')[0]
        }else{
          finalData = structuredData
        }
        setData(finalData)
        alert('Data Processed successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('File upload failed');
      }).finally(() =>{
        setLoading(false)
      })
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="file" name='sample' disabled={loading}/>
        <button type='submit' disabled={loading}>Upload</button>
      </form>
      {
        loading && 
      <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
}
{
  (!loading && data) && <PricingTable structuredData={data}/>
}
    </>
  )
}

export default App
