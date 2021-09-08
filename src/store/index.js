import { createStore } from "redux";

import reducer from "./common/reducer";

const store = createStore(reducer);

export default store;
