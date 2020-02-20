import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

// grabs the ip address
if (__DEV__) {
  const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

  const reactotron = Reactotron.configure({ host })
    .useReactNative()
    .connect();

  console.tron = reactotron;

  reactotron.clear();
}
