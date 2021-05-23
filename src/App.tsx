import React from 'react';
import './App.css';
import firebase from 'firebase';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import { Layout } from 'antd';
import LoggedIn from './components/LoggedIn';
import TopNav from './components/TopNav';
import LoggedOut from './components/LoggedOut';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDjZnEbjldaCbHizaFib3051sOiCstgCbs",
  authDomain: "todolist-7787d.firebaseapp.com",
  projectId: "todolist-7787d",
  storageBucket: "todolist-7787d.appspot.com",
  messagingSenderId: "47076179767",
  databaseURL: "https://todolist-7787d-default-rtdb.firebaseio.com/",
  appId: "1:47076179767:web:800d22e52f631d52c8a4b2"
});

export const firebaseAppAuth = firebaseApp.auth();
export const providers = { googleProvider: new firebase.auth.GoogleAuthProvider() };


const App: React.ComponentType<object & WrappedComponentProps> = ({ user, signOut, signInWithGoogle }) =>
  <div className="App">
    <TopNav user={user} signOut={signOut} />
    <Layout.Content className='h-screen p-8'>
      {user ?
        <LoggedIn user={user} /> :
        <LoggedOut signInWithGoogle={signInWithGoogle} />
      }
    </Layout.Content>
  </div >


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);