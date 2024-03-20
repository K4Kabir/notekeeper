import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
import { userAtom } from "./context/atoms";
import { useRecoilState } from "recoil";
import jwtAxios from "./libs/jwtAxios";
function App() {
  useEffect(() => {
    const getUserProfile = async function () {
      try {
        let res = await jwtAxios.post("/User/me");
        if (res.data.success) {
          setLoggedInUser({
            isAuthenticated: true,
            user: res.data.message,
          });
        } else {
          setLoggedInUser({
            isAuthenticated: false,
            user: {},
          });
        }
      } catch (error) {
        setLoggedInUser({
          isAuthenticated: false,
          user: {},
        });
      }
    };
    getUserProfile();
  }, []);

  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          {/* Protected */}
          <Route
            element={<ProtectedRoute user={loggedInUser?.isAuthenticated} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                user={!loggedInUser?.isAuthenticated}
                redirect="/dashboard"
              />
            }
          >
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
