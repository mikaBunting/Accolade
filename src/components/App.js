import React, {Component} from 'react';
import {toggleShop, loadApi, changePage, changeLang} from '../actions';
import {connect} from 'react-redux';
import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import Store from './Store';
import About from './About'
import axios from 'axios';
import ProductDetail from './ProductDetail';
import Order from './Order';
import Admin from './Admin';
import Overlay from './Overlay';
// import Contacts from './Contacts';

const mapDispatchToProps = dispatch => ({
    toggleShop: (value) => dispatch(toggleShop(value)),
    loadApi: (value) => dispatch(loadApi(value)),
    changePage: (value) => dispatch(changePage(value)),
    jumpBack: (value) => dispatch(jumpBack()),
    changeLang: (value) => dispatch(changeLang(value)),
})

const mapStateToProps = state => ({openShop: state.openShop, currentPage: state.currentPage, loaded: state.loaded, openOverlay: state.openOverlay, lang : state.lang})

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrolled: null,
            orders: [],
            phone: false,
            username: '',
            password: '',
        };
        if (!this.props.loaded) {
            axios
                .get(`https://indickecukrarstvi.cz/loadBaseData`)
                .then(res => {
                    this
                        .props
                        .loadApi(res.data)
                });
        }
        this._handleScroll = this._handleScroll.bind(this);
    }


    _handleScroll = () => {
        if (!this.state.scrolled && window.scrollY > 0) {
            this.setState({scrolled: true});
        } else if (window.scrollY == 0 && this.state.scrolled) {
            this.setState({scrolled: false});
        }
    }
        // componentDidUpdate(props) {
            
        //     // if(props.currentPage !==  window.location.pathname.replace("/","")) {
        //     //     props.changePage(props.currentPage);
        //     // }
        //     $(window).on('popstate', function(event) {
        //         let location = window.location.pathname;
                
        //         if(location == ""){ location = "home";}
        //         if(!window.location.replace("/","") == props.currentPage){ props.changePage(location.replace("/",""),true)};
                
        //     });
           
        // }
    componentDidMount() {
        const lang = localStorage.getItem('lang') ? localStorage.getItem('lang'): "";
        if(lang == 'en') {
            this.props.changeLang('en');
        }
       
        window.removeEventListener('scroll', this._handleScroll());
        if(window.location.pathname !== "" || window.location.pathname !== "/") {
            var pathArray = window.location.pathname.split('/');
            let correct = false;
            let isEng = false;
            if(pathArray.indexOf("en") !== -1) {
                isEng = true;
                this.props.changeLang('en');
            }
            pathArray.forEach(location => {
                if(location == 'shop' || location == 'about' || location == "home" || location == 'orders') {
                    correct = true;
                    this.props.changePage(location,true);
                }
            })
            
           if(!correct && window.location.pathname !== ""  && window.location.pathname !== "/" && window.location.pathname !== "/en") {
            if(isEng) {
                window.location.pathname = "/en";
            } else {
                window.location.pathname = "";
            }
            
           }
            
        }
        
       
        window.mobileAndTabletcheck = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            if(check ? jQuery('html').css('font-size', '24px') : null);
            return check;
          };
          this.setState({phone: window.mobileAndTabletcheck()});
        window.addEventListener('scroll', () => this._handleScroll());

        if(window.location.pathname == '/orders') {
           const username =  prompt("Enter your username");
           const password =  prompt("Enter your password");
           const { changePage } = this.props;
           if (!this.props.loaded) {
            axios
                .post(`https://indickecukrarstvi.cz/getOrders`, {username: username, password: password})
                .then(res => {
                    this.setState({orders: res.data, username: username, password: password});
                    changePage('admin');
                });
        }
        }

    }
    render() {
        if (this.props.loaded) {
            return (
                <div
                    className={(this.props.openShop
                    ? "app--wrapper open-shop"
                    : "app--wrapper") + (this.state.phone ? ' phone' : '') + (this.props.lang == 'en' ? ' en ' : '')+ (this.props.currentPage == "admin" ? ' admin' : '')}>
                    <div className="content--wrapper">
                        <Header phone={this.state.phone} scrolled={this.state.scrolled}/>
                        {this.props.openOverlay ? <Overlay /> : null}
                        <div className="main--wrapper">
                            {/* main/index page */}
                            {this.props.currentPage == "home" && <Home/>}

                            {/* store page */}
                            {this.props.currentPage == "shop" && <Store phone={this.state.phone}/>}

                            {/* about us page */}
                            {this.props.currentPage == "about" && <About phone={this.state.phone}/>}

                            
                            {/* about us page
                            {this.props.currentPage == "contacts" && <Contacts phone={this.state.phone}/>} */}

                            {/* product detail page */}
                            {this.props.currentPage == "product" && <ProductDetail isPhone={this.state.phone}/>}

                            {/* submit order page */}
                            {this.props.currentPage == "order" && <Order isPhone={this.state.phone}/>}

                            {this.props.currentPage == "admin" && <Admin username={this.state.username} password={this.state.password} orders={this.state.orders} />}
                        </div>
                        <footer className="footer">
                            <p><strong>Copyright© 2020</strong> indickecukrarstvi.cz | Pro indickecukrarstvi.cz Mika Strnadů</p>
                            <p></p>
                        </footer>
                    </div>
                    <Cart/>
                </div>
            );
        } else {
            return (
                <h1>Loading wait till I get it</h1>
            )
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
