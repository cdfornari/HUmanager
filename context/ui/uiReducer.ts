import { uiState } from './';

type uiAction = 
|{ type: 'UI - Toggle Sidebar' }
|{ type: 'UI - Toggle New Entry'}
|{ type: 'UI - Toggle Drag'}

export const uiReducer = (state: uiState, action: uiAction) => {
    switch (action.type) {
        case 'UI - Toggle Sidebar':
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen
            }
        case 'UI - Toggle New Entry':
            return {
                ...state,
                newEntryOpen: !state.newEntryOpen
            }
        case 'UI - Toggle Drag':
            return {
                ...state,
                isDragging: !state.isDragging
            }
        default: return state;
    }
}