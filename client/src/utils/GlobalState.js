import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// what we did here was create our own functionality to manage state
// at a global level and make it available to all of our other components through a special <Provider> component.

const useStoreContext = () => {
    return useContext(StoreContext);
}

// When we execute this function from within a component, we will receive the [state, dispatch] data 
// our StoreProvider provider manages for us. This means that any component that has access to our StoreProvider 
// component can use any data in our global state container or update it using the dispatch function.


export { StoreProvider, useStoreContext};

