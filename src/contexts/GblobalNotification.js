import React, { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

export const NotificationContext = createContext([{}, () => {}]);

const GblobalNotification = ({ children }) => {
    const [user] = useAuthState(auth)
    const [NotificationList, setNotificationList] = useState([]);

    useEffect(() => {
        if (user) {
            let uid = auth.currentUser.uid
            db.collection('users').doc(uid).collection('history')
            .where('type', '!=', 'message')
            .onSnapshot(snapshot => {
                let totalNotificationList = snapshot.docs.length;
                let result = snapshot.docs.map(doc => ({ list: doc.data(), id: doc.id, totalNotificationList }))
                setNotificationList(result)
            })
        }
    }, [user])
    
    return (
        <NotificationContext.Provider value={[NotificationList, setNotificationList]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default GblobalNotification;