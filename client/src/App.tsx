import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import FormBuilder from "./pages/FormBuilder";
import FormFiller from "./pages/FormFiller";
import FormResponses from "./pages/FormResponses";
import NotFound from "./pages/NotFound";

import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: `forms/new`, element: <FormBuilder /> },
      { path: `forms/:id/fill`, element: <FormFiller /> },
      { path: `forms/:id/responses`, element: <FormResponses /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center"></Toaster>
    </>
  );
}

export default App;
