import React from 'react';

const specialCharacters = { '?': '~q', '#': '~h', '/': '~s', ' ': '_' };

export default function TextInput(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.name}: </label>
      <input
        id={props.name}
        onChange={(event) => {
          const characters = event.currentTarget.value.split('');
          const sanitizedCharacters = characters.map((char) => {
            return specialCharacters.hasOwnProperty(char)
              ? specialCharacters[char]
              : char;
          });
          props.setText(sanitizedCharacters.join(''));
        }}
      />
    </div>
  );
}
