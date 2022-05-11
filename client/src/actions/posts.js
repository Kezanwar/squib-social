import axios from 'axios'
import { POSTS } from './types'
import { setAlert } from './alert'
import { HEADERS } from '../utilities/axiosConfig'

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios({
      url: 'api/posts',
      method: 'get',
    })
    if (res.data) {
      dispatch({
        type: POSTS.GET_ALL_POSTS,
        payload: res.data,
      })
      return
    }
    if (!res.data) {
      dispatch({
        type: POSTS.GET_ALL_POSTS_ERROR,
      })
    }
  } catch (err) {
    dispatch({
      type: POSTS.GET_ALL_POSTS_ERROR,
    })
  }
}
