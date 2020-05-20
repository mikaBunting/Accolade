
import React, { Component } from 'react';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
    texts: state.texts,
}) 
class Contacts extends Component {

    render() { 
        const {texts} = this.props;
            return (
                <div className="contacts--wrapper container-fluid">
                    <div className="row justify-content-center">
                        <section className='section--main-wrapper col-sm-8 col-xs-12'>
                            <div className="section--main__heading--wrapper" >
                                <h1 className="section--heading">{texts.contacts_heading}</h1>
                            </div>

                        </section>
                    </div>
                    <div className="row justify-content-around sections--wrapper">
                        <section className={`section--first-wrapper ${!this.props.phone? "col-sm-5" : "col-xs-12"} `}>
                            <p>{texts.contacts_name}</p>
                            <p>{texts.contacts_email}</p>
                            <p>{texts.contacts_phone}</p>
                        </section>
                        <section className={`section--first-wrapper ${!this.props.phone? "col-sm-5" : "col-xs-12"} `}>
                            <span>{texts.contacts_about_delivery}</span>
                        </section>
                    </div>
                </div>
             );
    }
}
 
export default connect(mapStateToProps)(Contacts);
