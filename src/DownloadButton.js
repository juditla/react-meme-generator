import React from 'react';

// currently downloads multiple images not one gif --> still a todo

export default function DownloadButton(props) {
  return (
    <div>
      <button
        onClick={() => {
          fetch(props.url, {
            method: 'GET',
            headers: {
              'Content-Type': 'image/gif',
            },
          })
            .then((response) => {
              response
                .arrayBuffer()
                .then(function (buffer) {
                  const url = window.URL.createObjectURL(new Blob([buffer]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'custom-meme.gif');
                  document.body.appendChild(link);
                  link.click();
                })
                .catch((error) => error);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Download
      </button>
    </div>
  );
}
