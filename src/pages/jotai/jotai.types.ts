interface UserType {
  id: string;
  name: string;
  age: number;
  email: string;
  penalty: number;
}

type UserDataType = Omit<UserType, 'id'>;

type ViewType = 'list' | 'tiles';

export type { UserDataType, ViewType, UserType };
