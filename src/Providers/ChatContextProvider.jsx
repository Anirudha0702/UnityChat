import {
    createContext,
    useReducer,
  } from "react";
  import PropsTypes from "prop-types";
  export const ChatContext = createContext();
  
 const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      reference:null,
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "SET_REFERENCE":
          return {
           reference:action.payload
          };
        case "RESET_REFERENCE":
          return {
           reference:null
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
  ChatContextProvider.PropsTypes = {
    children: PropsTypes.node,
}
export default ChatContextProvider;