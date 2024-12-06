import { reactionAdd } from "../../store/features/posts/postsSlice";
import { reactions, emojies, ReactionType, postReaction, post } from "../../store/features/posts/types";
import { useDispatch, UseDispatch } from "react-redux";


const ReactionButtons = ({post}:{post:post}) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(emojies).map(reaction =>{
    const [emoji, symbol] = reaction;
    return(
      <button 
        type="button" 
        key={emoji} 
        className="reactionButton"
        onClick={()=>{
          dispatch(reactionAdd({postId:post.id, reaction:emoji as ReactionType}))
        }}
      >
        {symbol} {post.reactions[emoji as ReactionType]}
      </button>
    )
  })
  return (
    <>
      {reactionButtons}
    </>
  )
}

export default ReactionButtons