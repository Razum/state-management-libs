import type { UserType } from '@/pages/jotai/jotai.types';
import type { TableColumnsType } from 'antd';

import { EditFilled } from '@ant-design/icons';
import { Button, Empty, Table } from 'antd';

interface UserTableProps {
  dataSource: UserType[];
  onSelect: (user: UserType) => void;
}

const UserTable = ({ dataSource, onSelect }: UserTableProps) => {
  const columns: TableColumnsType<UserType> = [
    {
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: 'Name'
    },
    {
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      title: 'Age',
      width: 100
    },
    {
      dataIndex: 'email',
      ellipsis: true,
      key: 'email',
      title: 'Email'
    },
    {
      dataIndex: 'penalty',
      key: 'penalty',
      render: (value: number) => value.toLocaleString(),
      sorter: (a, b) => a.penalty - b.penalty,
      title: 'Penalty',
      width: 120
    },
    {
      align: 'center',
      key: 'actions',
      render: (_, user) => (
        <Button
          aria-label={`Edit ${user.name}`}
          icon={<EditFilled />}
          type="primary"
          onClick={() => onSelect(user)}
        />
      ),
      title: 'Actions',
      width: 100
    }
  ];

  return (
    <Table<UserType>
      columns={columns}
      dataSource={dataSource}
      locale={{
        emptyText: <Empty description="No users match your search" />
      }}
      pagination={dataSource.length > 8 ? { pageSize: 8, showSizeChanger: false } : false}
      rowKey="id"
    />
  );
};

export default UserTable;
