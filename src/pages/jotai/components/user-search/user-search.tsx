import { usersSearchAtom } from '@/pages/jotai/jotai.store';
import { Input } from 'antd';
import { useAtom } from 'jotai';

interface UserSearchProps {
  className?: string;
}

const UserSearch = ({ className }: UserSearchProps) => {
  const [usersSearch, setUsersSearch] = useAtom(usersSearchAtom);
  return (
    <Input
      className={className}
      placeholder="Search by name"
      value={usersSearch}
      onChange={(e) => setUsersSearch(e.target.value)}
    />
  );
};

export default UserSearch;
