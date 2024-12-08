interface User {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  return { name, age };
}

const user = createUser("John Doe", 30);

console.log(user)
