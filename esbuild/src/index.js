import { get } from "httpie";

get("https://github.com")
  .then((response) => console.log(response))
