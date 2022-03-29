import { createContext } from 'react';
import { uiState } from './';

interface ContextProps extends uiState {
    toggleSidebar: () => void;
    toggleNewEntry: () => void;
    toggleDrag: () => void;
}

export const UIContext = createContext({} as ContextProps);