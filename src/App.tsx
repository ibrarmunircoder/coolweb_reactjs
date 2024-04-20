import { Routes } from 'routes';
import { Amplify } from 'aws-amplify';
import awsconfig from 'amplifyconfiguration.json';
import './App.css';

Amplify.configure(awsconfig);

function App() {
  return <Routes />;
}

export default App;
