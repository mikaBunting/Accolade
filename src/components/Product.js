
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {openProduct} from '../actions/index';


const mapStateToProps = state => ({
    texts: state.texts,
    lang: state.lang,
}) 

const mapDispatchToProps = dispatch => ({
    openProduct: (v) => dispatch(openProduct(v))
})
class Product extends Component {
    render() { 
        const {product, texts, lang} = this.props;
        const price = product.prices.length >= 2  ? product.prices[0] + " - " + product.prices[product.prices.length-1] : product.prices[0];
        const image = `url(${product.image})`;  
        const ribbon = product.ribbon == 'sleva'? 'sale'  : product.ribbon == 'novinka' ? 'new' : product.ribbon == 'pripravujeme' ? 'upcoming' : '';  
       
        return (
                <div className={`product__item--wrapper  ${this.props.phone ? 'col-12' : 'col-lg-4 col-md-6 col-sm-12'}  ${ribbon}`}>
                    <div className="product--item">
                        <div className="product__image--wrapper">
                            <div onClick={ () => {this.props.openProduct(product)}} style={{backgroundImage: image}} className="product__image">

                            </div>
                        </div>
                        <h3 onClick={ () => {this.props.openProduct(product)}} className="product--name">{lang =="en" ? product.name_eng: product.name}</h3>
                        {ribbon !== 'upcoming' && 
                        <div>
                            <span className="product--price">{price + " "}{texts.cart_total_currency} </span>
                            <div className="product__button--wrapper">
                                <span onClick={ () => {this.props.openProduct(product)}} className="product--button button"><span>{texts.shop_product_button_more}</span></span>
                            </div>
                        </div>}
                       
                    </div>
                </div>
             );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Product);
