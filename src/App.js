import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${
        process.env.PIXABAY_API_KEY || '37597513-db41cbc0eda7ceb43ab1ca74d'
      }&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]); // whenever term changes effect will run again...

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={setTerm} />
      {!isLoading && images.lenght === 0 && (
        <h1 className="text-center text-6xl mx-auto mt-52">No Image Found</h1>
      )}
      {isLoading ? (
        <h1 className="text-center text-6xl mx-auto mt-52">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
