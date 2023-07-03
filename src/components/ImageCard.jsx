import React from 'react';

const ImageCard = ({ image }) => {
  const tags = image.tags.split(',');

  const handleDownload = () => {
    const fileUrl = image.largeImageURL;

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tags[0]}.jpg`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-5">
      <img
        src={image.webformatURL}
        alt={tags}
        title={tags}
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="flex items-center">
          <div className="font-bold text-xl mb-2">
            Photo by {image.user}{' '}
            <span className="text-gray-500">| &nbsp;</span>
          </div>
          <div className="flex items-center justify-center rounded-full bg-gray-200 w-12 h-12">
            <img
              src={
                image.userImageURL ||
                'https://pixabay.com/static/img/profile_images/purple.svg'
              }
              alt="User Icon"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => {
          return (
            <span
              key={image.id + index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </span>
          );
        })}
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
