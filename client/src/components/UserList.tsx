import React from 'react';

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <ul className="list-disc list-inside">
        {users.map((user, index) => (
          <li key={index} className="text-gray-700">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;