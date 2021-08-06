import React from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ProfileRedirect() {
  const history = useHistory();
  useEffect(() => {
    history.push('/profile/me');
  }, [history])
  return (<></>)
}

export default ProfileRedirect
