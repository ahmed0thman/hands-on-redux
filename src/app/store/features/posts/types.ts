export type ReactionType = 'like' | 'happy' | 'wow' | 'heart' | 'angry';

export interface post{
  id: string,
  title:string,
  body:string,
  userId: string,
  date: string
  reactions: reactions
}

export type reactions = {
  like:number,
  happy:number,
  wow:number,
  heart:number
  angry:number
}

export type postReaction = {
  postId: string,
  reaction: ReactionType
}

export const emojies = {
  like: '👍',
  happy: '😄',
  wow: '😯',
  heart: '🩷',
  angry: '😡'

}