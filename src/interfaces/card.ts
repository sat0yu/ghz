export interface Card {
  author: Actor;
  closed: boolean;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  url: string;
}

interface Actor {
  avatarUrl: string;
  login: string;
  url: string;
}
