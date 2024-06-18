import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import ProtectedComponent from "./components/ProtectedComponent";
import SignUp from "./components/SignUp";
import { loadNoteDetail } from "./components/Notes/NoteForm";
import { lazy, Suspense } from "react";

export const appURL = import.meta.env.VITE_APP_URL || "/notes-app/";

// Lazy loading components
const Notes = lazy(() => import("./components/Notes/Notes"));
const NoteForm = lazy(() => import("./components/Notes/NoteForm"));

const router = createBrowserRouter([
  {
    path: appURL,
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "notes",
        element: <ProtectedComponent />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Notes />
              </Suspense>
            ),
            loader: () => {
              return import("./components/Notes/Notes").then((module) =>
                module.loadNotes()
              );
            },
          },
          {
            path: "archived",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Notes />
              </Suspense>
            ),
            loader: () => {
              return import("./components/Notes/Notes").then((module) =>
                module.loadArchivedNotes()
              );
            },
          },
          {
            path: "new",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NoteForm />
              </Suspense>
            ),
            // loader: () => {
            //   return import("./components/Notes/NoteForm").then((module) =>
            //     module.loadTagsAndCategories()
            //   );
            // },
            loader: async () => {
              const module = await import("./components/Notes/NoteForm");
              return module.loadTagsAndCategories();
            },
          },
          {
            path: ":noteId/edit",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NoteForm />
              </Suspense>
            ),
            loader: (meta) => {
              return import("./components/Notes/NoteForm").then((module) =>
                module.loadNoteDetail(meta)
              );
            },
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
