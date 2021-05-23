import React from 'react';
import './App.css';
import firebase from 'firebase';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import { Button, Row, Layout } from 'antd';
import googleLogo from './images/googleLogo.png'
import Main from './components/Main';

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
    <Layout.Header className='bg-blue-500	'>
      <Row className='items-center'>
        <h4 className='text-white'>To Do App</h4>
        {user && <Button className='ml-auto' onClick={signOut}>Sign out</Button>}
      </Row>
    </Layout.Header>
    <Layout.Content className='h-screen'>
      {user ? <Main user={user} /> :
        <div className='flex h-full'>
          <div className='my-auto mx-auto'>
            <h1 className='mb-8 text-8xl font-light	'>Welcome!</h1>
            <Button className='my-auto mx-auto' onClick={signInWithGoogle} >
              <Row>
                <img className='mr-2' alt='Google Logo' width='20px' src={googleLogo} />
                <div>Sign in with Google</div>
              </Row>
            </Button>
          </div>
        </div>
      }
    </Layout.Content>
  </div >


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);