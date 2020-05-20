export const actions = {
    toggleShop: "TOGGLE_SHOP",
    changePage: "CHANGE_PAGE",
    addToCart: "ADD_TO_CART",
}

export function toggleShop (value) {
    return {
        type: "TOGGLE_SHOP",
        value
    }
}

export function JUMP_BACK () {
    return {
        type: "JUMP_BACK",
    }
}
export function changeLang (value) {
    return {
        type: "CHANGE_LANG",
        value
    }
}
export function flushCart (value) {
    return {
        type: "FLUSH_CART",
        value
    }
}


export function changePage (value, back) {
    return {
        type: "CHANGE_PAGE",
        value,
        back: back != null ? back : false,
    }
}

export function addToCart (value) {
    return {
        type: "ADD_TO_CART",
        value: value,
    }
}

export function removeFromCart (product) {
    return {
        type: "REMOVE_FROM_CART",
        product: product,
    }
}

export function openProduct (value) {
    return {
        type: 'OPEN_PRODUCT',
        value,
    }
}

export function loadApi (value) {
    return {
        type: "LOAD_API",
        products: value.products,
        texts: value.texts,
    }
}

export function changeCategory (value) {
    return {
        type: "CHANGE_STORE_CATEGORY",
        payload: value,
    }
}

export function changeQuantity (index, quantity) {
    return {
        type: "CHANGE_QUANTITY",
        index: index,
        quantity: quantity
    }
}
export function toggleOverlay (value) {
    return {
        type: "TOGGLE_OVERLAY",
        value: value,
    }
}
