export const changeActiveStatus = (categoryId, serviceId) => {
    return {
        type: 'CHANGE_ACTIVE_STATUS',
        categoryId,
        serviceId
    }
}

export const updateService = (service) => {
    return {
        type: 'UPDATE_SERVICE',
        service
    }
}