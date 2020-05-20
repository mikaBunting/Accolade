



const defaultState = {
	openShop: false,
	currentPage: "home",
	cart: {
		products: [],
		totalPrice: 0,
	},
	openedProduct: null,
	texts: [],
	loaded: false,
	storeCategory: 'sweet',
	openOverlay: false,
	history: [],
	lang: "",
}
const reducer = (state = defaultState, action) => {

	 switch(action.type) {
		case "TOGGLE_SHOP":
			if(state.currentPage == "orders") {
				return Object.assign({}, state, {
					openShop: false,
				  })
			}

			return Object.assign({}, state, {
				openShop: action.value
			  })
		case "CHANGE_LANG":
			if(action.value == "en") {
				document.title = "First indian sweet shop";
				localStorage.setItem("lang","en");
				return Object.assign({}, state, {
					lang: action.value,
					texts: state.textsEng
				  })
			} else {
				document.title = "První indické cukrářství";
				localStorage.removeItem("lang");
				return Object.assign({}, state, {
					lang: 'cz',
					texts: state.textsCZ
				  })
			}
			
		case "CHANGE_PAGE":
			let history = state.history;
			let val = action.value;
			
			// if(action.back == false) {
			// 	window.history.pushState("", document.title,val);
			// }
			
			if(action.value == "order" || action.value == "orders") {
				return Object.assign({}, state, {
					currentPage: action.value,
					openShop: false,
					openOverlay: false,
				  })
			}
			return Object.assign({}, state, {
				currentPage: action.value,
				openOverlay: false,
			  })
			  
		case "JUMP_BACK":
			return Object.assign({}, state, {
				history: state.history.pop(),
			  })
		case "OPEN_PRODUCT":
			return Object.assign({}, state, {
				openedProduct: action.value,
				currentPage: "product",
			  })
		case "CLOSE_PRODUCT":
			return Object.assign({}, state, {
				openedProduct: null,
				currentPage: "shop",
				})
		case "LOAD_API": {
			let texts = {};
			for(let i = 0; i < action.texts.length; i++) {
				texts[action.texts[i].name] = action.texts[i].value;
			}
			let textsEng = {};
			for(let i = 0; i < action.texts.length; i++) {
				textsEng[action.texts[i].name] = action.texts[i].eng_value ? action.texts[i].eng_value : action.texts[i].value;
			}
			const lang = localStorage.getItem('lang') ? localStorage.getItem('lang'): "";
			const cartFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cart : state.cart;
			const finalTexts =  state.lang == "en" ? textsEng : texts
			return Object.assign({}, state, {
				texts: finalTexts,
				textsCZ: texts,
				textsEng: textsEng,
				products: action.products,
				loaded: true,
				lang: lang,
				cart: {
					products: cartFromStorage.products,
					totalPrice: cartFromStorage.totalPrice,
				},
				});
			}
		case "CHANGE_STORE_CATEGORY":
			return Object.assign({}, state, {
				storeCategory: action.payload,
			})
		case "FLUSH_CART": {
			localStorage.removeItem("cart");
			return Object.assign({}, state, {
				cart: {
					products: [],
					totalPrice: 0,
					
				},
			})
		}	
		case "ADD_TO_CART": {


			let products = state.cart.products || [];
			let newProduct = action.value;
			let added = false;
			let price = 0;
			products.forEach(p => {
				if(p.id == newProduct.id && p.size == newProduct.size) {
					p.quantity += newProduct.quantity;
					added = true;
				} 
			})
			if(!added) products.push(newProduct);
			products.forEach(p => {price += parseInt(p.price) * parseInt(p.quantity)});

			
			localStorage.setItem("cart",JSON.stringify({
				cart: {
					products: products,
					totalPrice: price,
				}}));
			const openCart = products.length < 2 && !state.openShop ? true : state.openShop;
			return Object.assign({}, state, {
				cart: {
					products: products,
					totalPrice: price,
					
				},
				openShop: openCart,
			})
		}
			break;
		case "REMOVE_FROM_CART": {
				let products = state.cart.products;
				let removedProduct = action.product;
				
				products.splice(products.findIndex(p => p.id == removedProduct.id && p.size == removedProduct.size), 1);
				let newPrice = 0;
				products.forEach(p => {newPrice += parseInt(p.price) * parseInt(p.quantity)});

				localStorage.setItem("cart",JSON.stringify({
					cart: {
						products: products,
						totalPrice: newPrice,
					}}));

				return Object.assign({}, state, {
					cart: {
						products: products,
						totalPrice: newPrice,
					}
				});
			}
		case "CHANGE_QUANTITY": {
			let products = [...state.cart.products];
			products[action.index].quantity = action.quantity;
			let newPrice = 0;
			products.forEach(p => {newPrice += parseInt(p.price) * parseInt(p.quantity)});
			localStorage.setItem("cart",JSON.stringify({
				cart: {
					products: products,
					totalPrice: newPrice,
				}}));

			return Object.assign({}, state, {
				cart: {
					products: products,
					totalPrice: newPrice,
				}
			});

		}
		case "TOGGLE_OVERLAY": {
			return Object.assign({}, state, {
				openOverlay: action.value,
			  })
		}
	 }


	return state
}

export default reducer
