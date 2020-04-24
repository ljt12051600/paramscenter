

export const deleteKey = (obj) => {
    let newObj = JSON.parse(JSON.stringify(obj))
  
    for (var key in newObj) {
      if (newObj[key] === null || newObj[key] === '') {
        delete newObj[key]
      }
    }
    return newObj
  };
  export const getSessionId=(name="userId")=>{
    return sessionStorage.getItem(name);
  }
  export const setSessionId=(name='userId',value)=>{
      sessionStorage.setItem(name,value)
  }
  export const clearSession=(name)=>{
      if(name){
          sessionStorage.clear(name)
      }
      else{
          sessionStorage.clear();
      }
  }