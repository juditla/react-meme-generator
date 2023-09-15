import { useState } from 'react';
import DownloadButton from './DownloadButton';
import GenerateButton from './GenerateButton';
import { memeTemplates } from './memeTemplate';
import TextInput from './TextInput';

export default function App() {
  const [topText, setTopText] = useState('this_could_be');
  const [bottomText, setBottomText] = useState('your_meme');
  const [template, setTemplate] = useState('oprah');
  const [memeUrl, setMemeUrl] = useState(
    `https://api.memegen.link/images/${template}/${topText}/${bottomText}.gif?width=300`,
  );

  const keysInLocalStorage = Object.keys(localStorage);
  const urlsInLocalStorage = [];
  keysInLocalStorage.forEach((key) => {
    if (
      key !== 'ally-supports-cache' &&
      key !== 'web-vitals-extension-metrics'
    ) {
      urlsInLocalStorage.push(localStorage.getItem(key));
    }
  });

  return (
    <>
      <div className="header">
        <h1>Meme Generator</h1>
      </div>
      {/* Input/Select fields to generate meme */}
      <div className="custom-input">
        <TextInput name="Top text" text={topText} setText={setTopText} />
        <TextInput
          name="Bottom text"
          text={bottomText}
          setText={setBottomText}
        />
        <div className="select-container">
          <label htmlFor="Meme template">Meme template:</label>
          <select
            name="Meme template"
            id="Meme template"
            // change memeUrl on change
            onChange={(event) => {
              setTemplate(event.currentTarget.value);
              const url = `https://api.memegen.link/images/${
                event.currentTarget.value
              }/${topText === 'this_could_be' ? '_' : topText}/${
                bottomText === 'your_meme' ? '_' : bottomText
              }.gif?width=300`;
              setMemeUrl(url);
              urlsInLocalStorage.push(url);
              localStorage.setItem(
                event.currentTarget.value + topText + bottomText,
                url,
              );
            }}
            // change memeUrl on enter
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                console.log('hisi');
                const url = `https://api.memegen.link/images/${template}/${
                  topText === 'this_could_be' ? '_' : topText
                }/${
                  bottomText === 'your_meme' ? '_' : bottomText
                }.gif?width=300`;
                setMemeUrl(url);
                urlsInLocalStorage.push(url);
                localStorage.setItem(template + topText + bottomText, url);
              }
            }}
          >
            {/* generate dropdown/option elements from imported memeTemplate Object */}
            {memeTemplates.map((memeTemplate) => {
              return (
                <option
                  value={memeTemplate.id}
                  key={`template-${memeTemplate.id}`}
                >
                  {memeTemplate.id}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Display current image */}
      <div className="meme">
        <img alt="custom meme" src={memeUrl} data-test-id="meme-image" />
      </div>
      {/* Generate button with logic to clear top & bottom text from initial value if there is no input */}
      <div className="buttons">
        <GenerateButton
          onClick={() => {
            const url = `https://api.memegen.link/images/${template}/${
              topText === 'this_could_be' ? '_' : topText
            }/${bottomText === 'your_meme' ? '_' : bottomText}.gif?width=300`;
            setMemeUrl(url);
            urlsInLocalStorage.push(url);
            localStorage.setItem(template + topText + bottomText, url);
          }}
        />
        <DownloadButton url={memeUrl} />
      </div>
      {/* Get search history from localStorage */}
      <div className="header search-history">
        <h1>Search history</h1>
        {Object.keys(localStorage).map((key) => {
          // elements that are always in localStorage should be skipped
          if (
            key !== 'ally-supports-cache' &&
            key !== 'web-vitals-extension-metrics'
          ) {
            return (
              <img
                src={localStorage.getItem(key)}
                alt={key}
                key={`meme-${key}`}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
