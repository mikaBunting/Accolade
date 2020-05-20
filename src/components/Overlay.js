
import React, { Component } from 'react';
import { toggleShop, changePage, toggleOverlay } from '../actions';
import { connect, } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    changePage: (value) => dispatch(changePage(value)),
    toggleOverlay: (value) => dispatch(toggleOverlay(value)),
  })
  
  const mapStateToProps = state => ({
    currentPage: state.currentPage,
    texts: state.texts,
    openOverlay: state.openOverlay
  })

class Overlay extends Component {
    render() { 
        const {texts, currentPage} = this.props;
        return (
            <div className="overlay--wrapper">
                    <i onClick={ () => this.props.toggleOverlay(!this.props.openOverlay)} className="far fa-times-circle"></i>
                    <ul>
                        <li className={currentPage == "home" ? "active" : ''} onClick={ () => {this.props.changePage("home")}}>
                           {texts.nav_home}
                        </li>
                        <li className={currentPage == "shop" ? "active" : ''} onClick={ () => {this.props.changePage("shop")}}>
                            {texts.nav_shop}
                        </li>
                        <li className={currentPage == "about" ? "active" : ''} onClick={ () => {this.props.changePage("about")}}>
                            {texts.nav_about}
                        </li>
                        {/* <li className={currentPage == "contacts" ? "active" : ''} onClick={ () => {this.props.changePage("contacts")}}>
                            {texts.nav_contacts}
                        </li> */}
                    </ul>
                    <img  onClick={ () => {this.props.changePage("home")}} id="logo" src="logo.png" />

            </div>
          );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Overlay);