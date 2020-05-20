
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCart, flushCart} from '../actions/index'
const axios = require('axios');

const mapDispatchToProps = dispatch => ({
    removeFromCart: (value) => dispatch(removeFromCart(value)),
    flushCart: () => dispatch(flushCart()),
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
            name: '',
            // lastname: '',
            phone: '',
            email: '',
            note: '',
            nameError: false,
            lastNameError: false,
            phoneError: false,
            emailError: false,
            productsError: false,
            ordered: false,
        }
    }

    handleSubmit = () => {
        const {name, lastname, phone, email, note, nameError, productsError, lastNameError, emailError, phoneError} = this.state;
        let errors = {}
        if(name.length < 2) {
            errors.nameError = true;
        } else {
            errors.nameError = false;
        }
        // if(lastname.length < 2) {
        //     errors.lastNameError = true;
        // } else {
        //     errors.lastNameError = false;
        // }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) || email.length < 6) {
            errors.emailError = true;
        } else {
            errors.emailError = false;
        }
        if(phone.length < 8) {
            errors.phoneError = true;
        } else {
            errors.phoneError = false;
        }
        if(this.props.cart.products.length <= 0) {
            errors.productsError = true;
        } else {
            errors.productsError = false;
        }
        this.setState({
            nameError: errors.nameError,
            emailError: errors.emailError,
            // lastNameError: errors.lastNameError,
            phoneError: errors.phoneError,
            productsError: errors.productsError,
        })
        let cart = this.props.cart;
        if(!(errors.nameError || errors.phoneError || errors.emailError || errors.productsError)) {
            let products = [];
            cart.products.map(p => {
                products.push({
                    id: p.id,
                    quantity: p.quantity,
                    size: p.size,
                    name: p.name,
                });
            })
            let user = {
                name: name,
                // lastname: lastname,
                phone: phone,
                email: email,
                note: note,
            }

            axios.post('https://indickecukrarstvi.cz/placeOrder', {
               products: products,
               user: user,
              })
              .then(function (response) {
 
              })
              .catch(function (error) {
                console.log(error);
              });
                this.setState({
                    ordered: true,
                });
                this.props.flushCart();
        }
    }

    handleChange = (property,event) => {
        let value = event.currentTarget.value;
        switch (property) {
            case 'phone':
                if(!/^[0-9]*$/.test(value)){
                    value = this.state.phone;
                }
                break;
        }
        let newState = {};
        newState[property] = value;
        this.setState(newState);
    }
    componentWillUnmount() {
        $('[data-toggle="popover"]').popover({
            animation: false,
        }).popover('hide')
    }
    render() { 
        const {texts, cart, lang} = this.props;
        const emailError = this.state.emailError ? texts.error_uncorrect_email : '';
        const phoneError = this.state.phoneError ? texts.error_uncorrect_phone : '';
        const nameError = this.state.nameError ? texts.error_uncorrect_name : '';
        // const lastNameError = this.state.lastNameError ? texts.error_uncorrect_lastname : '';
        const productsError = this.state.productsError ? texts.error_empty_cart : '';
        $(function () {
            $('[data-toggle="popover"]').popover({ trigger: 'manual'}).popover('show');
          })
            return (
                <div className="order--wrapper">
                    <div className="order__heading--wrapper">
                    <h1 className="section--heading">{texts.order_heading}</h1>
                    </div>
                    <div className="order__content--wrapper container">
                        <div className="row">
                            <div className={`order__summary--wrapper ${this.props.isPhone ? "col-xs-12" : "col-xs-12 col-md-6"} `}>
                                <table data-container="body" data-toggle="popover" data-placement="top" trigger="manual" data-content={productsError} className="float-right table table-striped table-light table-hover table-border">
                                    <thead>
                                        <tr>
                                            <th>{texts.order_product_name}</th>
                                            <th></th>
                                            <th>{texts.order_product_size}</th>
                                            <th>{texts.order_product_quantity}</th>
                                            <th>{texts.order_product_price}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.products.map((p,index) => {
                                            let engSize;
                                            if(lang == 'en') {
                                                engSize = p.sizes_eng[p.sizes.indexOf(p.size)];
                                            }
                                            return (
                                            <tr key={index}>
                                                <td colSpan={2}>{lang == 'en' ? p.name_eng : p.name}</td>
                                                <td>{lang == 'en' ? engSize : p.size }</td>
                                                <td>{p.quantity}</td>
                                                <td>{p.price * p.quantity}</td>
                                                <td ><i onClick={() => {this.props.removeFromCart(p)}} className="fas fa-trash"></i></td>
                                            </tr>
                                            )})}
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan={5}>{texts.cart_total}</th>
                                            <th>{cart.totalPrice}{texts.cart_total_currency}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className={`order__form--wrapper ${this.props.isPhone ? "col-xs-12" : "col-xs-12 col-md-6"}`}>
                           

                                <div className="order__form">
                                {this.state.ordered ? <div className="order__done">{texts.order_submited_message}</div> : <div>
                                        <div className="order__form--name-wrapper">
                                            <span>{texts.order_form_name}</span>
                                            <input data-container="body" data-toggle="popover" data-placement="right" trigger="manual" data-content={nameError} className="input-field" onChange={(e) => this.handleChange('name',e)} type="text" name="name"></input>
                                        </div>

                                        {/* <div className="order__form--lastname-wrapper">
                                            <span>{texts.order_form_lastname}</span>
                                            <input data-container="body" data-toggle="popover" data-placement="right" trigger="manual" data-content={lastNameError} className="input-field" onChange={(e) => this.handleChange('lastname',e)} type="text" name="lastname"></input>
                                        </div> */}
                                        <div className="order__form--email-wrapper">
                                            <span>{texts.order_form_mail}</span>
                                            <input data-container="body" data-toggle="popover" data-placement="right" trigger="manual" data-content={emailError} className="input-field" pattern="/.+@.+\.[A-Za-z]+$/"onChange={(e) => this.handleChange('email',e)} type="email" name="email"></input>
                                        </div>
                                        <div className="order__form--phone-wrapper">
                                            <span>{texts.order_form_phone}</span>
                                            <input data-container="body" data-toggle="popover" data-placement="right" trigger="manual" data-content={phoneError} className="input-field" pattern="" value={this.state.phone} onChange={(e) => this.handleChange('phone',e)} type="tel" name="tel"></input>
                                        </div>
                                        <div className="order__form--note-wrapper">
                                            <span>{texts.order_form_note}</span>
                                            <textarea value={this.state.note} onChange={(e) => this.handleChange('note',e)}></textarea>
                                        </div>
                                        <div className="order__form--button-wrapper">

                                            <div className="button-container-2">
                                                <span className="mas">{texts.order_form_submit_button}</span>
                                                <button onClick={() => this.handleSubmit()} type="button" name="Hover">{texts.order_form_submit_button}</button>
                                            </div>
                                        </div>
                                        <div className="order__note--wrapper">
                                            <p className="alert alert-info">{texts.order_note}</p>
                                        </div>
                                    </div>}
                                </div>
                                
                            </div>
                        </div>
                </div>
                </div>
            );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CartProduct);
