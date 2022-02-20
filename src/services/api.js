import axios from "axios";

const API_KEY = "24487864-7b2c5952ffc1a40da1f65d382";
const URL = "https://pixabay.com/api/";

export default async function GalleryApiService(searchQuery, page) {
  const response = await axios.get(URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: 12,
      page: page,
    },
  });

  return response.data;
}
