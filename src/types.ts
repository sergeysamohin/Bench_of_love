export interface Story {
  _id: string;
  userId: string;
  text: string;
  createdAt: number;
  likes: number;
}

export interface User {
  profileImage: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  story: Story;
  role: string;
  createdAt: string;
  updatedAt: string;
}