export const isItemExists = (array, newItem) => {
    return array.some((item) => item.id === newItem.id)
}
