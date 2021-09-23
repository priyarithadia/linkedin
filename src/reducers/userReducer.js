import { SET_USER } from "../actions/actionType";

const INITIAL_STATE = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){   
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }            
        default:
            return state;
    }
}

export default userReducer;


//All reducers update the given states
//switch is used foreg : if i liked the button son increment the button  by 1 and if there is no action then return to the default case.
