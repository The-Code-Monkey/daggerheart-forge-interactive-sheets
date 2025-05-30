import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Mock AuthContext
const mockAuthContext = {
  user: null,
  loading: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(),
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="auth-provider">{children}</div>;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Export everything from testing-library/react
export * from "@testing-library/react";
export { customRender as render };

// Mock useAuth hook
export const mockUseAuth = () => mockAuthContext;
