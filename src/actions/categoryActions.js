export const findMostPopular = () => {
    return {
        type: 'CHANGE_ACTIVE_STATUS'
    }
}

export const setSelectedServices = (services) => {
    return {
        type: 'SET_SELECTED_SERVICES',
        services
    }
}

export const searchServices = (searchText, isActive) => {
    return {
        type: 'SEARCH_SERVICES',
        searchText,
        isActive
    }
}

export const changeIsActive = () => {
    return {
        type: 'CHANGE_ISACTIVE'
    }
}
