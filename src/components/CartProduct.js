
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCart, changeQuantity} from '../actions/index'

const mapDispatchToProps = dispatch => ({
    removeFromCart: (value) => dispatch(removeFromCart(value)),
    changeQuantity: (index, quantity) => dispatch(changeQuantity(index,quantity)),
  })

const mapStateToProps = state => ({
    texts: state.texts,
    cart: state.cart,
    lang: state.lang,
}) 
class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.product.quantity,
        }
    }

    increaseQuantity = () => {
        this.setState({quantity: this.state.quantity+1});
        this.props.changeQuantity(this.props.index,this.props.product.quantity + 1)
    }

    decreaseQuantity = () => {
        if(this.state.quantity > 1) {
        this.setState({quantity: this.state.quantity-1});
        this.props.changeQuantity(this.props.index,this.props.product.quantity - 1)
        }

    }
    handleChangeInput = (event) => {
        if(!(/[0-9]|\./).test(event.target.value)){
            event.target.value = this.state.quantity;
        }  else {
            let val = parseInt(event.target.value);
            if(val < 1) val = 1;
            this.setState({quantity: val})
            this.props.changeQuantity(this.props.index, val);
         }
    }

    render() { 
        const {texts, product, index, lang} = this.props;
        const price = product.price * product.quantity;
        const {quantity, size, name, ID, name_eng} = product;
        let engSize;
        if(lang == 'en') {
            engSize = product.sizes_eng[product.sizes.indexOf(size)];
        }
        const image = `url(${product.image})`;    

            return (
                <div className="cart__product--item container-fluid">
                    <div className="row">
                        <div style={{backgroundImage: image}} className="cart__product--image col-6"></div>
                        <div className="cart__prodcut--info col-6">
                        <span className="cart__product--name">{ lang == "en" ? name_eng : name}</span>
                        <span className="cart__product--close" onClick={() => this.props.removeFromCart(product)}><i className="fas fa-trash"></i></span>
                        <span className="cart__product--size">{lang == "en" ? engSize : size}</span>
                        <span className="cart__product--price">{price}{texts.cart_total_currency}</span>
                        <div className="cart__product--quantity-wrapper">
                                <button className="decrease-button" onClick={() => this.decreaseQuantity()}>-</button>
                                <input className="input-field" onChange={ (event) => this.handleChangeInput(event)} value={this.state.quantity}></input>
                                <button className="increase-button" onClick={() => this.increaseQuantity()}>+</button>
                        </div>
                        
                        </div>
                    </div>
                </div>
            );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CartProduct);
