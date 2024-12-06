import { useState } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import { addPost } from "../../store/features/posts/postsSlice";
import { AllUsers } from "../../store/features/users/userSlice";
import { user } from "../../store/features/users/types";
import { AppDispatch } from "../../store/store";

const PostAdd = () => {
  const [addPostStatus, setAddPostStatus] = useState<string>('idle') 
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const users:user[] = useSelector(AllUsers)

  const renderUsers = users.map(user => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ))

  


  function HandleSetTitle(title:string){
    setTitle(title)
  }

  function HandleSetContent(content:string){
    setContent(content)
  }

  function HandleSetUser(userId:string){
    setUserId(userId)
  }
  const canSave = title && content && userId && addPostStatus==='idle'

  function savePostClicked(){
    if(canSave){
      try {
        setAddPostStatus('pending')
        dispatch(
          addPost({
            title, 
            body:content, 
            userId
          })
        ).unwrap()
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save the post', error)
      }finally{
        setAddPostStatus('idle')
      }
      
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          type="text" 
          name="postTitle" 
          id="postTitle"
          value={title}
          onChange={e => HandleSetTitle(e.currentTarget.value)}
          required
        />

        <label htmlFor="users">Author:</label>
        <select
          name="users"
          id="users"
          value={userId}
          onChange={e => HandleSetUser(e.currentTarget.value)}
        >
          <option value=''>Select--</option>
          {renderUsers}
        </select>

        <label htmlFor="postContent">Post Content:</label>
        <input 
          type="text" 
          name="postContent" 
          id="postContent"
          value={content}
          onChange={e => HandleSetContent(e.currentTarget.value)}
          required
        />

        <button
          type="button"
          onClick={savePostClicked}
          disabled={!canSave}
        >Save Post</button>
      </form>
    </section>
  )
}

export default PostAdd