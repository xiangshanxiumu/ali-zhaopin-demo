import { init } from '@rematch/core';
import {app}  from '../models/app';
import {home} from '../models/home';
const store = init({
    models: {
      // data model
      app,
      home,
    }
  });
export { store };