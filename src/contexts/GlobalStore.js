import React, { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

export const SaveListContext = createContext([{}, () => { }]);
export const NotificationContext = createContext([{}, () => { }]);

const GlobalStore = ({ children }) => {
    const [user] = useAuthState(auth)
    const [saveList, setSaveList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);

    // save list
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

    // notification list
    useEffect(() => {
        if (user) {
            let uid = auth.currentUser.uid
            db.collection('users').doc(uid).collection('history').onSnapshot(snapshot => {
                let totalNotificationList = snapshot.docs.length;
                let result = snapshot.docs.map(doc => ({ list: doc.data(), id: doc.id, totalNotificationList }))
                setNotificationList(result)
            })
        }
    }, [user])

    return (
        <SaveListContext.Provider value={[saveList, setSaveList]}>
            <NotificationContext.Provider value={[notificationList, setNotificationList]}>
                {children}
            </NotificationContext.Provider>
        </SaveListContext.Provider>
    )
}

export default GlobalStore;