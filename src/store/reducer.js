import { ADD_ANNONCE } from "./action";

function annonceDataReducer(state={annonces: [{ id : 0 , title : 'first one'},{ id : 1 , title : 'second'}]}, action){

  
    switch(action.type) {
        case ADD_ANNONCE:
           Object.assign(state, 
              {
                annonces: [...state.annonces, action.annonce]
               }); 
               console.log("Its added : ", state);
               return  {...state}
         default: 
           return {...state};
     }
}

export default annonceDataReducer;