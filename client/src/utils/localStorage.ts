function getLocalStorage<T = unknown>(key: string): T {
  const item :string  = localStorage.getItem(key);
   if(!item){
    return null
   } 
    return JSON.parse(item) as T;
}

export {getLocalStorage} ;