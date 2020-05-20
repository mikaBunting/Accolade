
import React, { Component } from 'react';
import { connect } from 'react-redux';
const axios = require('axios');


const mapStateToProps = state => ({
    texts: state.texts,
}) 



class AdminOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.order.status,
            isEdited: false,
            removed: false,
        }
    }
    handleChange = (e) => {
        if(!this.state.isEdited){
            this.setState({status: e.target.value, isEdited: true})
        } else {
            this.setState({status: e.target.value})
        }
    }

    saveChanges = (status) => {
        let newStatus = status ? status : this.state.status;
        this.setState({isEdited: false});
        axios.post('https://indickecukrarstvi.cz/changeStatus', {
            id: this.props.order.id,
            status: newStatus,
            username: this.props.username,
            password: this.props.password,
           })
           .catch(function (error) {
             console.log(error);
           });
           if(status) {
               this.setState({removed: true})
           }
    }
    render() { 
        const {id, name, lastname, email, phone, products, status, note, price, date } = this.props.order;
        let newDate = new Date(date);
        const formatedDate = `${newDate.getDate()}/${newDate.getMonth() +1}/${newDate.getFullYear()}`
            return (
                <tr className={`admin-order--wrapper ${this.state.removed ? 'removed' : ''}`}>    
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{lastname}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td><input  onChange={ e => this.handleChange(e) } value={this.state.status} className="admin--order__input" type="text"></input></td>
                    <td>{formatedDate}</td>
                    <td>{note}</td>
                    <td>{price}</td>
                    <td>{products.map((p, index) => {
                                return (<div key={index} className="product">
                                    {`- ${p.name} ${p.size} ${p.quantity}x`}
                                </div>)})}
                    </td>
                    <td ><i onClick={e => this.saveChanges('done')} className="fas fa-trash-alt"></i></td>
                    {this.state.isEdited &&  <td onClick={() => this.saveChanges()} className="submit"><i className="fas fa-check"></i></td>}
                </tr>
             );
    }
}
 
export default connect(mapStateToProps)(AdminOrder);