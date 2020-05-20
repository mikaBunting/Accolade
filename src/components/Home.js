
import React, { Component } from 'react';
import { connect, } from 'react-redux';
import {changePage} from '../actions/index.js'

const mapStateToProps = (state) => ({
    texts: state.texts
});
const mapDispatchToProps = (dispatch) => ({
    changePage: (val) => {dispatch(changePage(val))}
});

class Home extends Component {
    render() { 
        return (
            <div className="home--wrapper">
                <section className="first">
                    <div className="heading--wrapper">
                        <h1>{this.props.texts.home_heading}</h1>
                        <p className="text" dangerouslySetInnerHTML={{__html: this.props.texts.about_short}}></p>
                        {/* <div onClick={() => this.props.changePage("shop")} className="slider">
                        <span className="left"></span>
                        <span className="right"></span>

                        <span className="overlay">{this.props.texts.nav_shop}</span>
                    </div> */}
                    <img className="home--ribbon" alt="ribbon" src="ribbon.png"></img>
                    </div>

                </section>
                {/* <div className="spacer"></div>
                <div className="parallax">
                    <div className="parallax-text">
                        <h2 className="section--heading">{this.props.texts.nav_about}</h2>
                         <p className="text">{this.props.texts.about_short}</p>
                        <div className="button" onClick={() => this.props.changePage("about")}><span>{this.props.texts.button_more}</span></div>
                    </div>
                </div> */}
            </div>
         );               
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Home);
