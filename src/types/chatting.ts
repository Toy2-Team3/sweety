export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export interface ChattingRoomProps {
  id: string;
  isPrivate: boolean;
  latestMessage: Message | null;
  name: string;
  updateAt: string;
  users?: { id: string; username: string; picture: string }[];
}
