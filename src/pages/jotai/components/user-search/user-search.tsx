import { usersSearchAtom } from '@/pages/jotai/jotai.store';
import { Input } from 'antd';
import { useAtom } from 'jotai';

interface UserSearchProps {
  allowClear?: boolean;
  'aria-label'?: string;
  className?: string;
}

const UserSearch = ({ allowClear, 'aria-label': ariaLabel, className }: UserSearchProps) => {
  const [usersSearch, setUsersSearch] = useAtom(usersSearchAtom);
  return (
    <Input
      allowClear={allowClear}
      aria-label={ariaLabel ?? 'Search users by name'}
      className={className}
      placeholder="Search by name"
      value={usersSearch}
      onChange={(e) => setUsersSearch(e.target.value)}
    />
  );
};

export default UserSearch;
