import React from 'react';

export default function GenerateButton(props) {
  return (
    <div>
      <button
        data-test-id="generate-meme"
        onClick={() => {
          props.onClick();
        }}
      >
        Generate
      </button>
    </div>
  );
}
