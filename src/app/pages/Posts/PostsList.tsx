import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { post } from "../../store/features/posts/types"
import { AllPosts, fetchPosts } from "../../store/features/posts/postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { AppDispatch } from "../../store/store"

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {posts, status, error} = useSelector(AllPosts)
  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchPosts())
    }
  },[status, dispatch])
  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

  const renderPosts = orderedPosts.map((post:post) => (
    <article id={post.id} key={post.id}>
      <h3>{post.title}</h3>
      <p className="postCredit">
        <PostAuthor userId={post.userId}/>
        <TimeAgo timeStamp={post.date} />
      </p>
      <p>{post.body}</p>
      <ReactionButtons post={post}/>
    </article>
  ))

  let content;
  if(status === "loading"){
    content = <p>loading...</p>
  }
  else if (status==='succeeded'){
    content = renderPosts
  }
  else if(status==='failed'){
    content = <p>{error}</p>
  }
  return (
    <section>
      <h2>Posts</h2>
      {
        content
      } 
    </section>
  )
}

export default PostsList