export const ADD_ANNONCE = 'ADD_ANNONCE' // action types

export function addAnnonce(annonce) {
  return ({     
    type: 'ADD_ANNONCE',
    annonce
 })
     
}