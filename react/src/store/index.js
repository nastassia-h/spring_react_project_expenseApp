import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   mode: "light",
   user: null,
   token: null,
   posts: [],
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setMode: (state) => {
         state.mode = state.mode === "light" ? "dark" : "light"
      },
      setLogout: (state) => {
         state.user = null;
         state.token = null;
         localStorage.removeItem('ACCESS_TOKEN')
      },
      setUser: (state, action) => {
         state.user = action.payload.user;
      },
      setToken: (state, action) => {
         state.token = action.payload.token;
         localStorage.setItem('ACCESS_TOKEN', action.payload.token)
      },
      setExpenses: (state, action) => {
         if (state.user) {
            state.user.expenses = action.payload.expenses;
         } else {
            console.error("You have no expensies yet")
         }
      },
      setCategories: (state, action) => {
         state.categories = action.payload.categories
      },
      setPost: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id === action.payload.post.id) return action.payload.post
            return post;
         })
         state.posts = updatedPosts
      },
      setComment: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id == action.payload.comment.post_id) return { ...post, comments: [action.payload.comment, ...post.comments] }
            return post;
         })
         state.posts = updatedPosts
      },
      deleteComment: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id == action.payload.comment.post_id) return { ...post, comments: [action.payload.comment, ...post.comments] }
            return post;
         })
         state.posts = updatedPosts
      }
   }
})

export const { setMode, setToken, setFriends, setComment, deleteComment, setLogout, setUser, setExpenses, setCategories, setPosts } = authSlice.actions
export default authSlice.reducer