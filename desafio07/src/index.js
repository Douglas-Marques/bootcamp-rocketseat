import React from 'react';
import { StatusBar } from 'react-native';

import './config/reactotronConfig';

import Routes from './routes';

export default function app() {
  return (
    <>
      <StatusBar barStyle="light-conten" backgroundColor="#141419" />
      <Routes />
    </>
  );
}
