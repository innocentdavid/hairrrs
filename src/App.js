import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Businesses from './pages/Businesses/Businesses';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Layout from './Layout';
import Product from './pages/Product/Product';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import Article from './pages/Article/Article';
import { getRandomInt } from './fuctions';
import ImageUploadProcessing from './components/ImageUploadProcessing';
import AddProduct from './pages/Add_Product/AddProduct';
import AddJob from './pages/Add_Job_v/AddJob';
import Profile from './pages/Profile/Profile';
import BusinessProfile from './pages/BusinessProfile/BusinessProfile';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Articles from './pages/Articles/Articles';
import { auth, db } from './firebase';
import UserProfile from './components/UserProfile';
import Job from './pages/Job/Job';
import Jobs from './pages/Jobs/Jobs';
import ApplyForJob from './ApplyForJob/ApplyForJob';

function App() {
// useEffect for signing up users
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
          db.collection('users').doc(authUser.uid)
              .onSnapshot(user => {
                  UserProfile.setUser(user.data());
              });
      }
  })

  return () => { unsubscribe() }
}, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path='/ImageUploadProcessing' exact component={ImageUploadProcessing} />

          <Layout key={getRandomInt(100000000)}>
            <Route path='/settings' exact component={SettingsPage} />
            <Route path='/articles' exact component={Articles} />
            <Route path='/' exact component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/business-profile' exact component={BusinessProfile} />
            <Route path='/add-product' exact component={AddProduct} />
            <Route path='/add-job' exact component={AddJob} />
            <Route path='/apply' exact component={ApplyForJob} />
            <Route path='/job' exact component={Job} />
            <Route path='/jobs' exact component={Jobs} />
            <Route path='/products' exact component={Products} />
            <Route path='/product' exact component={Product} />
            <Route path='/businesses' exact component={Businesses} />
            <Route path='/create-article' exact component={CreateArticle} />
            <Route path='/article' exact component={Article} />
          </Layout>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Switch>
      </Router>
    </>
  );
}

export default App;
console.clear();
console.log("console cleared");