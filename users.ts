type User = {
  id: number;
  userName: string;
  role: UserRole;
};

type UserRole = 'admin' | 'member' | 'contributor';

type UpdatedUser = Partial<User>;

let nextUserId = 1;

const users: User[] = [
  { id: nextUserId++, userName: 'iryna_kalachenko', role: 'admin' },
  { id: nextUserId++, userName: 'john_doe', role: 'member' },
  { id: nextUserId++, userName: 'jane_doe', role: 'contributor' },
  { id: nextUserId++, userName: 'tomas_kendall', role: 'member' },
];

function fetchUserDetails(userName: string): User | undefined {
  return users.find(
    user => user.userName.toLowerCase() === userName.toLowerCase()
  );
}

console.log(fetchUserDetails('iryna_kalachenko'));
console.log(fetchUserDetails('eiren525'));

function updateUser(id: number, updates: UpdatedUser): void {
  const foundUser = users.find(user => user.id === id);
  if (!foundUser) {
    console.error('User not found!');
    return;
  }
  Object.assign(foundUser, updates);
}

updateUser(2, { userName: 'kendall_smith' });
updateUser(4, { role: 'contributor' });

function addNewUser(newUser: Omit<User, 'id'>): User {
  const user: User = {
    id: nextUserId++,
    ...newUser,
  };
  users.push(user);
  return user;
}

console.log(users);

addNewUser({ userName: 'bob_schnoe', role: 'member' });
