import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

export const SaveListContext = React.createContext([{}, () => {}]);

const GlobalStore = ({ children }) => {
    const [user] = useAuthState(auth)
    const [saveList, setSaveList] = useState([]);

    useEffect(() => {
        if (user) {
            let uid = auth.currentUser.uid
            db.collection('users').doc(uid).collection('saveList').onSnapshot(snapshot => {
                let totalSaveList = snapshot.docs.length;
                let result = snapshot.docs.map(doc => ({ list: doc.data(), id: doc.id, totalSaveList }))
                setSaveList(result)
            })
        }
    }, [user])
    
    return (
        <SaveListContext.Provider value={[saveList, setSaveList]}>
            {children}
        </SaveListContext.Provider>
    )
}

export default GlobalStore;