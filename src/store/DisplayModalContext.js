import React from "react";

export const DisplayModalContext = React.createContext({
	onModal: false,
	onOpen: () => {},
	onClose: () => {},
});
