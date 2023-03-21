import { createContext, useContext, useState } from "react";

// faudra récuperer les users de la base de données

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(users);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const usersState = useContext(UsersContext);

  if (!usersState) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return usersState;
};
