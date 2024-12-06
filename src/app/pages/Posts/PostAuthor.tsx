import { useSelector, UseSelector } from "react-redux";
import { AllUsers } from "../../store/features/users/userSlice";
import { user } from "../../store/features/users/types";

const PostAuthor = ({userId}:{userId?:string}) => {
  const users:user[] = useSelector(AllUsers);

  const author:user = users.find(user => user.id.toString() === userId) as user
  return <span> by {author? author.name : "Unknown Author"}</span>
}

export default PostAuthor