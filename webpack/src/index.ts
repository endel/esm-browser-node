import { get } from "httpie";

get("https://github.com/")
  .then((response: any) => console.log(response));

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello webpack';

  return element;
}

document.body.appendChild(component());

