import axios from 'axios';
import React from 'react';

// currently downloads multiple images not one gif --> still a todo

export default function DownloadButton(props) {
  return (
    <div>
      <button
        onClick={() => {
          axios({
            url: props.url,
            mode: 'no-cors',
            method: 'GET',
            responseType: 'blob',
          })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'custom-meme.gif';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);

              // fetch
              // const url = window.URL.createObjectURL(new Blob([response.data]));
              // const link = document.createElement('a');
              // link.href = url;
              // link.setAttribute('download', 'custom-meme.gif');
              // document.body.appendChild(link);
              // link.click();
              // link.remove();
            })
            .catch((error) => console.log(error));
        }}
      >
        Download
      </button>
    </div>
  );
}
