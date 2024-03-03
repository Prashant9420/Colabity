import { createRoot } from "react-dom/client";
import { lazy } from "react";
import Loader from "./utils/loader";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
const App = lazy(() => import("./App"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const EditorPage = lazy(() => import("./pages/editorPage"));
const NotFound404 = lazy(() => import("./pages/notFound404"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "editor/:roomId",
        element: (
          <Suspense fallback={<Loader />}>
            <EditorPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound404 />
      </Suspense>
    ), 
  }
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "#0b0c10",
                color: "#66fcf1",
                textShadow: "0 0 5px #66fcf1",
              },
              iconTheme: {
                primary: "#66fcf1",
                secondary: "#0b0c10",
              },
            },
          }}
        ></Toaster>
      </div>
      <RouterProvider router={router} />
    </Provider>
  );
}
