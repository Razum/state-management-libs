import type { UserType } from '@/pages/jotai/jotai.types';
import type { TableColumnsType } from 'antd';

import { EditFilled } from '@ant-design/icons';
import { Button, Table } from 'antd';

interface UserTableProps {
  dataSource: UserType[];
  onSelect: (user: UserType) => void;
}

const UserTable = ({ dataSource, onSelect }: UserTableProps) => {
  const columns: TableColumnsType<UserType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Penalty', dataIndex: 'penalty', key: 'penalty' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Button type="primary" icon={<EditFilled />} onClick={() => onSelect(user)} />
      )
    }
  ];

  return <Table columns={columns} dataSource={dataSource} rowKey="id" />;
};

export default UserTable;
