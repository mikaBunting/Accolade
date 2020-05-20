
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addToCart} from '../actions/index';


const mapStateToProps = state => ({
    texts: state.texts,
    openedProduct: state.openedProduct,
    lang: state.lang,
}) 

const mapDispatchToProps = dispatch => ({
    addToCart: (v) => dispatch(addToCart(v)),
})
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            size: 0,
        }
    }

    increaseQuantity = () => {
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseQuantity = () => {
        if(this.state.quantity > 1) {
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    changeQuantity = (event) => {
        if(!(/[0-9]|\./).test(event.target.value)){
            event.target.value = this.state.quantity;
        }  else {
            let val = parseInt(event.target.value);
            if(val < 1) val = 1;
            this.setState({quantity: val})
         }
    }
    changeSize = (size) => {
        this.setState({size: size})
    }
    handleSubmit = () => {
        const openedProduct = this.props.openedProduct;
        const strippedProduct = {
            name: openedProduct.name,
            name_eng: openedProduct.name_eng,
            id: openedProduct.id,
            size: openedProduct.sizes[this.state.size],
            sizes: openedProduct.sizes,
            sizes_eng: openedProduct.sizes_eng,
            quantity: this.state.quantity,
            price: parseInt(openedProduct.prices[this.state.size]),
            image: openedProduct.image,
        }
        this.props.addToCart(strippedProduct)
    }
    render() { 
        const {texts, openedProduct, lang} = this.props;
        const image = `url(${openedProduct.image})`;    
        const ribbon =  openedProduct.ribbon == 'pripravujeme' ? 'upcoming' : '';  
        console.log(openedProduct.alergens_eng);
            return (
                <div className="product-detail--wrapper container">
                    <div className='row'>
                    
                        <div style={{backgroundImage: image}} className="product-detail__image  col-md-6 col-sm-12">
                        
                        </div>
                        <div className="product-detail__form--wrapper col-sm-6 col-xs-12">
                            <h1 className="product-detail--name">{lang =="en" ? openedProduct.name_eng : openedProduct.name}</h1>
                            <p className="product-detail--description">{lang =="en" ? openedProduct.description_eng : openedProduct.description}</p>

                            <div className="product__allergen--wrapper">
                                {openedProduct.alergens.length > 0 && <span>{texts.product__allergen}</span>}
                                { (lang== 'en' ? openedProduct.alergens_eng : openedProduct.alergens).map((a,index) => {
                                    return <span onClick={() => {this.changeSize(index)}} key={index}>{a}</span>
                                })}
                            </div>
                            {ribbon !== "upcoming" && 
                            <div>
                                <div className="product-detail__quantity--wrapper">
                                    <button className="decrease-button" onClick={() => this.decreaseQuantity()}>-</button>
                                    <input className="input-field" onChange={ (event) => this.changeQuantity(event)} value={this.state.quantity}></input>
                                    <button className="increase-button" onClick={() => this.increaseQuantity()}>+</button>
                                </div>
                                <div className="product__size--wrapper">
                                    {(lang == "en" ? openedProduct.sizes_eng : openedProduct.sizes).map((s,index) => {
                                        return <span onClick={() => {this.changeSize(index)}} key={index} className={index == this.state.size ? "product--size active" : "product--size"}>{s}</span>
                                    })}
                                </div>
                                <p className="product-detail--price">{openedProduct.prices[this.state.size]}{ " " + texts.cart_total_currency}</p>

                                <button onClick={() => this.handleSubmit()} className="product-detail__button--add btn-3">{texts.shop_add_to_cart}</button>
                                <div className="store__note--wrapper">
                                    <p className="alert alert-info">{texts.shop_info}</p>
                                </div>
                            </div>}
                            
                            
                        </div>
                    </div>
                </div>
             );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
