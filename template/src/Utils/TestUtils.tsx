import "@testing-library/jest-dom";
import React, { ErrorInfo } from "react";
import { render, RenderResult, RenderOptions } from "@testing-library/react";
import AppProviders from "../context/AppProviders";

/**
 * Valid JSON Web Token
 */
export const validJWT: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3QiOiJpcyBhd2Vzb21lISJ9.j8Z3twgi5nCrZJXH1JoxfQ8q1u5btwr3vS3wyqfytOo";

/**
 * Test Setup Providers
 *
 * @remarks
 * A Wrapper component that sets up all the global context providers,
 * data stores, etc, for our component under test. This should help
 * to reduce boilerplate often needed in every test.
 */
const TestSetupProviders: React.FC = ({ children }) => {
  return (
    <TestErrorBoundary>
      <AppProviders>{children}</AppProviders>
    </TestErrorBoundary>
  );
};

export type CustomRenderOptions = {
  route: string;
} & Omit<RenderOptions, "queries">;

/**
 * Render into a container which is appended to document.body.
 * It should be used with cleanup.
 *
 * @param ui - The container element to be rendered into.
 * @param options - Additonal options as referenced here
 * {@Link https://testing-library.com/docs/react-testing-library/api#render-options}
 */
function customRender(
  ui: React.ReactElement,
  options?: CustomRenderOptions
): RenderResult {
  const route = options?.route || "/";
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: TestSetupProviders, ...options });
}

/**
 * Waits for promises running in the non-async timer callback to complete.
 * From {@Link https://stackoverflow.com/a/58716087/308237}
 */
export function flushPromises(): Promise<unknown> {
  return new Promise((resolve) => setImmediate(resolve));
}

/**
 * Test Error Boundary used to wrap components under test that throw errors.
 * e.g. `throw Error("You shall not pass!!")`.
 */
export class TestErrorBoundary extends React.Component {
  public state = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError({ message }: Error) {
    return { hasError: true, message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="dialog" aria-label="Error Dialog">
          <h1>Something went wrong</h1>
          <p>{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
