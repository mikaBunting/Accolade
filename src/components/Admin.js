
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminOrder from './AdminOrder';

class Admin extends Component {

    render() { 
        const {orders} = this.props;
        console.log(orders[0])
        console.log();
        return (<div className="admin--wrapper container-fluid">
            <div className="row">
                <div className="col-12 table-responsive">
                    <table className="table table-stripped table-bordered table-light table-hover">
                        <thead className="thead-dark">
                            <tr>
                                {Object.keys(orders[0]).map((k, index) => {return(<th key={index} scope="col">{k}</th>)})}
                                <th className="remove-th"></th>
                                <th className="edit-th"></th>
                            </tr>
                        </thead>
                        <tbody>
                          
                          {orders.map((o, ind) => {
                              if(o.status !== 'done') {
                                return ( <AdminOrder username={this.props.username} password={this.props.password} order={o} key={ind} />)
                              }})}
                          
                          
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}
 
export default connect()(Admin);



