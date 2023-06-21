import Authentication from "./components/Authentication/Authentication";
import Main from "./components/Main/Main";

const Backoffice = () => {
  const isAuthenticated = true;
  return !isAuthenticated ? <Authentication /> : <Main />;
};

export default Backoffice;
