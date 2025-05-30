import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  root: Element | null = null;
  rootMargin = "";
  thresholds: readonly number[] = [];

  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {
    jest.fn();
  }

  observe() {
    jest.fn();
  }
  unobserve() {
    jest.fn();
  }
  disconnect() {
    jest.fn();
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(global as any).IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
(global as any).ResizeObserver = class ResizeObserver {
  constructor(_: ResizeObserverCallback) {
    jest.fn();
  }
  observe() {
    jest.fn();
  }
  unobserve() {
    jest.fn();
  }
  disconnect() {
    jest.fn();
  }
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
