
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import {changeCategory} from '../actions/index';

const mapStateToProps = state => ({
    texts: state.texts,
    storeCategory: state.storeCategory,
    products: state.products,
}) 

const mapDispatchToProps = dispatch => ({
    changeCategory: (value) => dispatch(changeCategory(value))
})
class Store extends Component {
   
    render() { 
        const {texts, products, storeCategory } = this.props;
            return (
                <div className="store--wrapper">
                    <div className="store__heading--wrapper">
                        <h1 className="section--heading">{texts.nav_shop}</h1>
                    </div> 
                    
                    <div className="store__category--wrapper">
                        <h2 className={this.props.storeCategory == 'sweet' ? 'active' : ''} onClick={() => this.props.changeCategory('sweet')}>{texts.shop_heading_sweet}</h2> 
                        <h2 className={this.props.storeCategory == 'salt' ? 'active' : ''} onClick={() => this.props.changeCategory('salt')}>{texts.shop_heading_salt}</h2>
                    </div>
                    <div className="store__products--wrapper container-fluid">
                        <div className="row">
                            {products.sort((a,b) => a.position - b.position).map((p,index) => { 
                                if(storeCategory == 'sweet' && p.tag == 'sweet'){
                                    return <Product phone={this.props.phone} key={index} product={p} />
                                } else if(storeCategory == 'salt' && p.tag == 'salt') {
                                        return <Product phone={this.props.phone} key={index} product={p} />
                                }})
                            }
                        </div>
                    </div>
                </div>
             );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Store);
