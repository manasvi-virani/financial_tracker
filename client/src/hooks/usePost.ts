// import { useState, useEffect } from 'react';
// import { postHttpsWithAuth } from '../utils/api';

// function postH<Req extends object , Res = unknown>(url: string, payload: Req) {
//   const [data, setData] = useState<Res | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const postData = async () => {
//       try {
//         const response: Res = await postHttpsWithAuth(url, payload);
//         setData(response);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     postData();
//   }, []);

//   return { data, loading, error };
// }

// export default usePost;
