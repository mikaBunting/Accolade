
import React, { Component } from 'react';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
    texts: state.texts,
}) 
class About extends Component {

    render() { 
        const {texts} = this.props;
            return (
                <div className="about--wrapper container-fluid">
                    <div className="row justify-content-center">
                        <section className={`section--main-wrapper ${!this.props.phone? "col-sm-8" : "col-xs-12"}`}>
                            <div className="section--main__heading--wrapper" >
                                <h1 className="section--heading">{texts.aboutUs_heading}</h1>
                            </div>
                            <i><p>{texts.article_aboutUs}</p>
                            <p>{texts.about_signature}</p>
                            <p>{texts.contacts_name}</p>
                            <p>{texts.contacts_email}</p>
                            <p>{texts.contacts_phone}</p></i>
                        </section>
                    </div>
                    <div className="row justify-content-around sections--wrapper">
                        <section className={`section--first-wrapper ${!this.props.phone? "col-sm-5" : "col-xs-12"} `}>
                            <h2 className="">{texts.aboutUs_smallArticle_heading_first}</h2>
                            <span>{texts.aboutUs_smallArticle_first}</span>
                        </section>
                        <section className={`section--second-wrapper  ${!this.props.phone? "col-sm-5" : "col-xs-12"} `}>
                            <h2 className="">{texts.aboutUs_smallArticle_heading_second}</h2>
                            <span>{texts.aboutUs_smallArticle_second}</span>
                        </section>
                        <section className={`section--third-wrapper  ${!this.props.phone? "col-sm-5" : "col-xs-12"} `}>
                            <h2 className="">{texts.aboutUs_smallArticle_heading_third}</h2>
                            <span>{texts.aboutUs_smallArticle_third}</span>
                        </section>
                    </div>
                </div>
             );
    }
}
 
export default connect(mapStateToProps)(About);