import React from "react";

export default function Clipboard() {

  const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied the text: " + str);
  }
  const copyInputToClipboard = () => {
    const copyText = document.getElementById('myInput');
    if (copyText.value === '') { return; }
    copyToClipboard(copyText.value);
  }
  const copyQueryToClipboard = () => {
    const copyText = document.getElementById("query");
    copyToClipboard(copyText.textContent);
  }
  const getUrlQuery = () => {
    const query = window.location.search.substring(1);
    const params = query.split("&");
    for (let i = 0; i < params.length; i++) {
      const pair = params[i].split("=");
      if (pair[0] === "q") {
        return pair[1];
      }
    }
    return null;
  }

  const urlQuery = getUrlQuery();
  return (
    <main>
      <h2>Clipboard</h2>
      <input id="myInput" />
      <button onClick={copyInputToClipboard}>Copy</button>
      <br />
      {urlQuery && <div><span id="query">{urlQuery}</span><button onClick={copyQueryToClipboard}>Copy</button></div>}
    </main>
  );
}
