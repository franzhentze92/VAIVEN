import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'transporter' | 'admin';
  phone?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loginAsClient: () => void;
  loginAsTransporter: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || 'Usuario',
      email: userData.email,
      userType: userData.userType,
      phone: userData.phone,
      company: userData.company
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const loginAsClient = () => {
    const clientUser: User = {
      id: 'client-demo',
      name: 'Demo Client',
      email: 'client@demo.com',
      userType: 'client',
      company: 'Demo Company'
    };
    setUser(clientUser);
    localStorage.setItem('user', JSON.stringify(clientUser));
  };

  const loginAsTransporter = () => {
    const transporterUser: User = {
      id: 'transporter-demo',
      name: 'Demo Transporter',
      email: 'transporter@demo.com',
      userType: 'transporter',
      company: 'Demo Transport Co.'
    };
    setUser(transporterUser);
    localStorage.setItem('user', JSON.stringify(transporterUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loginAsClient,
      loginAsTransporter
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}