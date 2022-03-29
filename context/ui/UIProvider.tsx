import { FC, useReducer } from 'react';
import { UIContext,uiReducer } from './';

export interface uiState {
    sidebarOpen: boolean;
    newEntryOpen: boolean;
    isDragging: boolean;
}

const uiInitialState: uiState = {
    sidebarOpen: false,
    newEntryOpen: false,
    isDragging: false
}

export const UIProvider: FC = ({children}) => {
    const [uiState,dispatch] = useReducer(uiReducer, uiInitialState);
    const toggleSidebar = () => dispatch({type: 'UI - Toggle Sidebar'});
    const toggleNewEntry = () => dispatch({type: 'UI - Toggle New Entry'});
    const toggleDrag = () => dispatch({type: 'UI - Toggle Drag'});
    return (
        <UIContext.Provider value={{
            ...uiState,
            toggleSidebar,
            toggleNewEntry,
            toggleDrag
        }}>
            {children}
        </UIContext.Provider>
    )
};