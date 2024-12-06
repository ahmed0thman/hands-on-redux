import { createSlice, nanoid, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post, postReaction } from "./types";
import { RootState } from "../../store";
import { sub } from "date-fns";
import { stat } from "fs";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [] as post[],
  status: 'idle',
  error: undefined as string | undefined
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addPost = createAsyncThunk('posts/addPost', async (initalPost:{title:string,body:string,userId:string})=> {
  const response = await axios.post(POSTS_URL, initalPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    postAdd:{
      reducer(state, action: PayloadAction<post>){
        state.posts.push(action.payload)
      },
      prepare(title:string, content:string, userId:string){
        return {
          payload:{
            id: `${nanoid()}`,
            title,
            body:content,
            userId,
            date: new Date().toISOString(),
            reactions:{
              like: 0,
              happy:0,
              wow: 0,
              heart: 0,
              angry:0
        
            }
          }
        }
      }
    },
    reactionAdd(state, action: PayloadAction<postReaction>){
      const {postId, reaction} = action.payload;
      const postFound = state.posts.find(post => post.id === postId)
      if(postFound){
        postFound.reactions[reaction]++
      }

    },
  },
  extraReducers(builder){
    builder
    .addCase(fetchPosts.pending, (state, action)=>{
      state.status = 'loading'
    })
    .addCase(fetchPosts.fulfilled, (state, action)=>{
      console.log(fetchPosts.fulfilled)
      state.status = 'succeeded'
      // Adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post:post)=>{
        post.date = sub(new Date(), {minutes: min++}).toISOString();
        post.reactions = {
          like: 0,
          happy:0,
          wow: 0,
          heart: 0,
          angry:0
        }
        return post
      })
      if(state.posts.length === 0)
      {
        state.posts = state.posts.concat(loadedPosts)
      }
      else{
        state.posts = loadedPosts
      }
    })
    .addCase(fetchPosts.rejected, (state, action)=>{
      state.status = 'failed';
      state.error = action.error.message
    })
    .addCase(addPost.fulfilled, (state, action)=>{
      action.payload.id = nanoid();
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        like: 0,
        happy:0,
        wow: 0,
        heart: 0,
        angry:0
      }
      console.log(action.payload)
      state.posts.push(action.payload)
    })
  }
})

export const AllPosts = (state: RootState) => state.posts

export const {postAdd, reactionAdd} = postsSlice.actions

export default postsSlice.reducer