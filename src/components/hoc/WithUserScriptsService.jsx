import React from "react";
import { UserScriptsConsumer } from "../common/UserScriptsContext/UserScriptsContext";

const withUserScriptsService = () => (Wrapped) => {
	return (props) => {
		return (
			<UserScriptsConsumer>
				{
					(UserScriptsService) => {
						return (<Wrapped {...props}
							userScriptsService={UserScriptsService}/>)
					}
				}
			</UserScriptsConsumer>
		)
	}
};

export default withUserScriptsService;