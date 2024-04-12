import { v4 as uuidv4 } from 'uuid';

export const createUser =()=>{
  let userId =  window.localStorage.getItem("userId");
  if(userId == null || userId == undefined || userId == ""){
    window.localStorage.setItem("userId",uuidv4());
  }
}


export const getUserId =()=>{
  return window.localStorage.getItem("userId");
}

