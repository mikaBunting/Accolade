
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toggleShop, changePage} from '../actions/index'
import CartProduct from './CartProduct';

const mapDispatchToProps = dispatch => ({
    toggleShop: (value) => dispatch(toggleShop(value)),
    changePage: (value) => dispatch(changePage(value))
  })

const mapStateToProps = state => ({
    openShop: state.openShop,
    texts: state.texts,
    cart: state.cart
}) 
class Cart extends Component {
    render() { 
        const {texts, cart} = this.props;
            return (
            <div className="cart--wrapper">
                <div className="cart--header">
                    <h2>{texts.cart_heading}</h2>
                    <i onClick={ () => this.props.toggleShop(!this.props.openShop)} className="far fa-times-circle"></i>
                </div>
                <div className="cart--body">
                    <h3>{texts.cart_products_heading}</h3>
                    <div className="cart--products">
                        {cart.products && cart.products.map((p, index) => {
                            return  <CartProduct index={index} key={index} product={p} />
                        })}
                       
                    </div>
                </div>
                <div className="cart--footer">
                    <span className="label-total">{texts.cart_total}</span>
                    <span className="label-price">{cart.totalPrice} {texts.cart_total_currency}</span>
                    <div className="button cart__button--checkout" onClick={() => this.props.changePage('order')}><span>{texts.cart_checkout_button}</span></div>
                </div>
            </div> );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
