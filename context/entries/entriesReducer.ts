import { entriesState } from './';
import { Entry } from '../../interfaces/entry';

type entriesAction =
| { type: 'ENTRIES - Load', payload: Entry[] }
| { type: 'ENTRIES - Add', payload: Entry}
| { type: 'ENTRIES - Update', payload: Entry}
| { type: 'ENTRIES - Delete', payload: string}

export const entriesReducer = (state: entriesState, action: entriesAction) => {
    switch (action.type) {
        case 'ENTRIES - Load':
            return {
                ...state,
                entries: [...action.payload]
            };
        case 'ENTRIES - Add':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case 'ENTRIES - Update':
            return {
                ...state,
                entries: state.entries.map(entry => 
                    entry._id === action.payload._id ? action.payload : entry
                )
            }
        case 'ENTRIES - Delete':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload)
            }
        default:
            return state;
    }
};