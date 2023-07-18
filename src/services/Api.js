import axios from 'axios';
import { POSTS_PER_PAGE } from 'constants/constans';

const KEY = '38296038-6bca705c520bca5e85b496146';

const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    page: 1,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: POSTS_PER_PAGE,
  },
});

export const requestGalleryList = async (category, page) => {
  const { data } = await instance.get(`/`, {
    params: { q: category, page: page },
  });
  return data;
};
