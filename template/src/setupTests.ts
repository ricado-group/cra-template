import { server } from "./mocks/server.js";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";
import { validJWT } from "./Utils/TestUtils";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

/**
 * Mock the window.matchMedia method or before tests.
 * "oficial" workaround detailed here:
 * https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Set the location to the / route as we auto-redirect users to that route
window.history.pushState({}, "Home page", "/");

// Mock cookies before tests.
Object.defineProperty(window.document, "cookie", {
  writable: true,
  value: `ricadoJwt=${validJWT}`,
});

// Mock SocketIO WebSockets
jest.mock("socket.io-client");
beforeEach(() => {
  const socket = new MockedSocket();
  socketIOClient.mockReturnValue(socket);
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
