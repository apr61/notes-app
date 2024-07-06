import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./components/NotFound";
import { useAppDispatch } from "./app/hooks";
import { fetchAllTags } from "./features/tags/tagsSlice";
import { Suspense, lazy, useEffect } from "react";
import { ShowNoteSkeleton } from "./components/Skeletons";
import Login from "./pages/Login";
import RequireAuth from "./layouts/RequireAuth";

const ShowNote = lazy(() => import("./pages/ShowNote"));
const CreateNote = lazy(() => import("./pages/CreateNote"));
const EditNote = lazy(() => import("./pages/EditNote"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<ShowNoteSkeleton />}>
              <ShowNote />
            </Suspense>
          }
        />
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          path="/create"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <CreateNote />
            </Suspense>
          }
        />
        <Route
          path="/:id/edit"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <EditNote />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/auth/login"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Login />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
