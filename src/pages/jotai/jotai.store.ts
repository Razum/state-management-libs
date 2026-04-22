import type { UserType, UserDataType, ViewType } from '@/pages/jotai/jotai.types';

import users from '@/pages/jotai/jotai.data';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const usersAtom = atom(users);
const usersSearchAtom = atom('');

const usersManagerAtom = atom(
  (get) => get(usersAtom).filter((user) => user.name.includes(get(usersSearchAtom))),
  (get, set, newUser: UserType | UserDataType) => {
    if ('id' in newUser) {
      set(
        usersAtom,
        get(usersAtom).map((user) => (user.id === newUser.id ? newUser : user))
      );
    } else {
      set(usersAtom, [...get(usersAtom), { ...newUser, id: crypto.randomUUID() }]);
    }
  }
);

const viewAtom = atomWithStorage<ViewType>(
  'view',
  (localStorage.getItem('view') as ViewType) || 'list'
);

const userDrawerAtom = atom(false);

const selectedUserAtom = atom<UserType | undefined>();

export { usersAtom, usersSearchAtom, usersManagerAtom, viewAtom, userDrawerAtom, selectedUserAtom };
