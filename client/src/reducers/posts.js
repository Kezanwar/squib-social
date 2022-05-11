import { POSTS } from '../actions/types'

const initialState = {
  allPosts: null,
}

function postsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case POSTS.GET_ALL_POSTS:
      return {
        ...state,
        allPosts: payload,
      }
    default:
      return state
  }
}

export default postsReducer
