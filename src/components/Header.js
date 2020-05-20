
import React, { Component } from 'react';
import { toggleShop, changePage, toggleOverlay, changeLang } from '../actions';
import { connect, } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    toggleShop: (value) => dispatch(toggleShop(value)),
    changePage: (value) => dispatch(changePage(value)),
    toggleOverlay: (value) => dispatch(toggleOverlay(value)),
    changeLang: (value) => dispatch(changeLang(value)),
  })
  
  const mapStateToProps = state => ({
    openShop: state.openShop,
    currentPage: state.currentPage,
    texts: state.texts,
    cart: state.cart,
    openOverlay: state.openOverlay,
    lang: state.lang,
  })

class Header extends Component {
    render() { 
        const {cart, texts, currentPage, scrolled, openShop} = this.props;
        return (
            <header className={scrolled ? "header scrolled" : "header"}>
                <nav>
                    <img  alt="logo" onClick={ () => {this.props.changePage("home")}} id="logo" src="logo.png" />
                    <ul className={this.props.phone ? 'd-none' : ''}>
                        <li className={currentPage == "home" ? "active" : ''} onClick={ () => {this.props.changePage("home")}}>
                           <a onClick={e =>  e.preventDefault()} href="/home">{texts.nav_home}</a>
                        </li>
                        <li className={currentPage == "shop" ? "active" : ''} onClick={ () => {this.props.changePage("shop")}}>
                            <a onClick={e =>  e.preventDefault()} href="/shop">{texts.nav_shop}</a>
                        </li>
                        <li className={currentPage == "about" ? "active" : ''} onClick={ () => {this.props.changePage("about")}}>
                            <a onClick={e =>  e.preventDefault()} href="/about">{texts.nav_about}</a>
                        </li>
                        {/* <li className={currentPage == "contacts" ? "active" : ''} onClick={ () => {this.props.changePage("contacts")}}>
                            {texts.nav_contacts}
                        </li> */}
                        
                    </ul>
                    <label onClick={ () => this.props.toggleOverlay(!this.props.openOverlay)} className="menu-icon"><span className="navicon"></span></label>
                    <div className="cart-icon--wrapper">
                    <a className="lang-button" onClick= { (e) => {e.preventDefault();this.props.changeLang(this.props.lang == 'en' ? "" : "en")}}>{this.props.lang == 'en' ? "cz" : "en"}</a>
                        <a onClick={ (e) => {e.preventDefault();this.props.toggleShop(!openShop)}}><i className="fas fa-shopping-basket"></i><span>{cart.totalPrice + " " + texts.cart_total_currency}</span></a></div>
                </nav>
            </header>
          );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Header);
