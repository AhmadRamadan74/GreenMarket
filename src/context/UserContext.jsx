import { createContext, use, useEffect } from "react";
import { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();


export default function UserContextProvider({children}){
    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem('userToken') || null;
    });


    useEffect(()=> { 
        const token = localStorage.getItem('userToken');
        if(token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUserToken(token);
        }   
    }, [])

    return (
        <UserContext.Provider value={{userToken , setUserToken}}>
            {children}
        </UserContext.Provider>
    )
}






// export default function UserContextProvider({children}){
//     const [userToken, setUserToken] = useState(null)
    

// useEffect(()=> { 
//         if(localStorage.getItem('userToken')) {
//             setUserToken(localStorage.getItem('userToken'));
//         }
//     }, []) 
//     return <>
//         <UserContext.Provider value={{userToken , setUserToken}}>
//             {children}
//         </UserContext.Provider>
//     </>
// }   