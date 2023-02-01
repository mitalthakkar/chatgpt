import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";

function Login(props) {
  const dispatchCall = useDispatch();

  useEffect(() => {
    dispatchCall(
      login({
        name: "mital",
        role: 1,
      })
    );
    props.history.push("/home");
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          dispatchCall(
            login({
              name: "mital",
              role: 1,
            })
          );
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
