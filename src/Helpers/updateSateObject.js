/**
 * This function updates the value of a state. 
 * This only works when the state is an object and the value of the key is a string or number. 
 * Do not call on states that are Arrays or on 
 * 
 * @param {} newValue  This is the new value of the state
 * @param {String} stateName This is the name of the state to be updated ie the key in the state object
 * @callback setState This is the function that updates the state 
*/

function updateSateObject(newValue, stateName, setState){
        setState(prev => ({...prev, [stateName]:newValue}))
}

export default updateSateObject;