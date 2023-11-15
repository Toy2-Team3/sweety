export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export interface ChattingRoomProps {
  id: string;
  isPrivate: boolean;
  latestMessage: string | null;
  name: string;
  updateAt: string;
}
