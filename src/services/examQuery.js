import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const API_HOST = 'http://localhost:3000';

let request = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

request.interceptors.request.use(function(config){
  let url = `${process.env.NODE_ENV === 'development' ? '/proxy-api' : API_HOST}${config.url}`;
  config.url = url;
  return config
});

request.interceptors.response.use(function(response)  {
  return response.data
})


export function useFollowingList() {
  return useQuery({
    queryKey: ['followinglist'],
    queryFn: async () => {
      const { items } = await request.get('/following_list');
      return items
    },
    initialData: []
  })
}

export function useForYouList() {
  return useQuery({
    queryKey: ['for_you_list'],
    queryFn: async () => {
      const { items } = await request.get('/for_you_list');
      return items
    },
    initialData: []
  })
}