import React from 'react';
import { Button, Row } from 'antd';
import googleLogo from '../images/googleLogo.png'

const LoggedOut: React.FC<{ signInWithGoogle: () => void }> = ({ signInWithGoogle }) => {
  return (
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
  );
}

export default LoggedOut
