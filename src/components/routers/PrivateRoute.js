import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Login from "../ui/Login";

export default function PrivateRoute(props) {
	const { userData } = useContext(UserContext);
	useEffect(() => {}, [userData.token]);
	return (
		<Route {...props}>
			{userData.token ? props.children : <Login private={true} />}
		</Route>
	);
}
