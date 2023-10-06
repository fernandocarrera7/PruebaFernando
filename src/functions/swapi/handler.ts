import { defaultResponse } from "@libs/api-gateway";
import axios from "axios";

module.exports.swapi = async (event) => {
  try {
    let id = event.headers.id;
    const url = "https://swapi.py4e.com/api/people/" + id;
    const { data } = await axios.get(url, {
      headers: {
        "content-type": "application/json",
      },
    });
    return defaultResponse(200, { data });
  } catch (err) {
    throw new Error(`Error : ${err.message}`);
  }
};
