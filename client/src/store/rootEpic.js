import {combineEpics} from 'redux-observable';
import epics from './epics';

export default combineEpics(...epics);
