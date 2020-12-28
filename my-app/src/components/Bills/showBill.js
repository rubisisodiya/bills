import React from 'react'
import {connect} from 'react-redux'
import {getBillsList} from '../../actions/bill'
import moment from 'moment'
import { Link } from 'react-router-dom'
//import html2pdf from 'html2pdf.js'

function Tabular(props){
    const { data } = props
    return (
        <div>
            <table border='1' style={{borderCollapse:'collapse'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map((product,i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{product.product.name}</td>
                            <td>{product.product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.price*product.quantity}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

// function printPageArea(areaID){
//     var printContent = document.getElementById(areaID);
//     var WinPrint = window.open('', '', 'width=900,height=650');
//     WinPrint.document.write(printContent.innerHTML);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     setTimeout(() => {
//         WinPrint.close();
//     }, 2000);
// }

//

class BillShow extends React.Component {
    componentDidMount(){
        this.props.dispatch(getBillsList())
    }

    render(){
        //console.log(this.props.bill)
        const bill = this.props.bill
        return (
            <>
            <h2>Bills Info</h2>
                <div className="row" id='bill' style={{marginLeft:'50px'}}>
                    <div className="section">
                        { bill && 
                          <><h5><u>{ bill.billId} - {moment(bill.date).format('LLL')}</u></h5>
                          {bill.customer && (
                              <div className='billTo'>
                              <p>To: {bill.customer.name}</p>
                              <p>email: {bill.customer.email}</p>
                              <p>Phone: {bill.customer.phone}</p>
                              <p>Address: {bill.customer.address}</p>
                            </div>
                          )}
                          <p> Description - { bill.description}</p>
                          <Tabular data={bill.products} />
                          <br/>
                          <div className="detailContain">
                            <p>tax: {bill.tax}% </p>
                            <p>Other charges: {bill.otherCharges} </p>
                            <p>Total: {bill.total} </p>
                            <p>discount: {bill.discount}% </p>
                            <p>payMode: {bill.payMode} </p>
                            <p style={{fontWeight:'bold',fontSize:'medium'}}><em>Grand Total:</em> {bill.totalAmount}</p>
                          </div>
                          </>
                        }
                    </div>
                </div>
                {/* <button onClick={() => {
                    printPageArea('bill')
                }}>Print</button> */}
                {/* <button onClick={() => {downloadAsPdf('bill',bill.billId)}}>Download as pdf</button>
                <br/> */}
                <Link to='/invoices'>Back</Link>
            </>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        bill: state.bills.find(b => b._id===props.match.params.id)
    }
}

export default connect(mapStateToProps)(BillShow)