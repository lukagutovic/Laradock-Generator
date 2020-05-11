import DATA from '../data/laradock-generator-data.json';
import cloneDeep from 'lodash/cloneDeep'
 
const initState = {
    categories: DATA.data.categories,
    mostPopular: DATA.data.categories.sort((a, b) => b.services_aggregate.aggregate.count - a.services_aggregate.aggregate.count).slice(0, 3),
    selectedServices: DATA.data.categories.find(category => category.name === 'Database Management Systems').services,
    searchResult: DATA.data.categories.find(category => category.name === 'Database Management Systems').services,
    isActive: false
}

const rootReducer = (state = initState, action) => {
    let clonedState = null;
    switch (action.type) {
        case 'FIND_MOST_POPULAR':
            clonedState = cloneDeep(state)
            clonedState.mostPopular = state.categories.sort((a, b) => b.services_aggregate.aggregate.count - a.services_aggregate.aggregate.count).slice(0, 3)
            return clonedState;
        case 'SET_SELECTED_SERVICES':
            clonedState = cloneDeep(state)
            clonedState.selectedServices = action.services
            clonedState.searchResult = action.services
            return clonedState;
        case 'CHANGE_ACTIVE_STATUS':
            const { categoryId, serviceId } = action

            clonedState = cloneDeep(state)
            const catId = clonedState.categories.findIndex(category => category.id === categoryId)
            const servId = clonedState.categories[catId].services.findIndex(service => service.id === serviceId)

            clonedState.categories[catId].services[servId].active = clonedState.categories[catId].services[servId].active ? false : true
            return clonedState
        case 'UPDATE_SERVICE':
            console.log('UPDATE_SERVICE: ', action.service)
            clonedState = cloneDeep(state)
            
            const cid = clonedState.categories.findIndex(category => category.id === action.service.category_id)
            const sid = clonedState.categories[cid].services.findIndex(service => service.id === action.service.id)

            clonedState.categories[cid].services[sid] = action.service
            return clonedState
        case 'SEARCH_SERVICES':

            let filtered = state.selectedServices
                            .filter(service => service.name.toLowerCase().includes(action.searchText))
                            
            if (state.isActive) {
                filtered = filtered.filter(service => service.active === action.isActive)
            }
            clonedState = cloneDeep(state)
            clonedState.searchResult = filtered
            return clonedState
        case 'CHANGE_ISACTIVE':
            clonedState = cloneDeep(state)
            clonedState.isActive = !state.isActive
            return clonedState
        default:
            return state;
    }
}

export default rootReducer;