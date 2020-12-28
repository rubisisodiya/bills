import React from 'react'
import { connect } from 'react-redux'
import { getPurchasesList } from '../../actions/purchase'
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
                      return (<tr key={product.product._id}>
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
//   var printContent = document.getElementById(areaID);
//   var WinPrint = window.open('', '', 'width=900,height=650');
//   WinPrint.document.write(printContent.innerHTML);
//   WinPrint.document.close();
//   WinPrint.focus();
//   WinPrint.print();
//   setTimeout(() => {
//         WinPrint.close();
//     }, 2000);
// }

// function downloadAsPdf(areaID,id){
//   var printContent = document.getElementById(areaID)
//   var opt = {
//       margin:       1,
//       filename:     `invoice-${id}.pdf`,
//       image:        { type: 'jpeg', quality: 1 },
//       html2canvas:  { scale: 4 },
//       jsPDF:        { unit: 'cm', format: 'A4', orientation: 'portrait' }
//   };
//   html2pdf().set(opt).from(printContent).save()
// }

class PurchaseShow extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPurchasesList())
  }

  render() {
    //console.log(this.props.purchase)
    const purchase = this.props.purchase
    return (
      <>
        <h2>Purchase Info</h2>
        <div className='row' id='purchase' style={{marginLeft:'60px'}}>
          <div className='section'>
            {purchase && (
              <>
                <h5>
                  <u>{purchase.invoice} - {moment(purchase.date).format('LLL')}</u>
                </h5>
                <Tabular data={purchase.products} />
                <br/>
                <div className='detailContain'>
                  <p>tax: {purchase.tax}%</p>
                  <p>Other charges: {purchase.otherCharges}</p>
                  <p>Total: {purchase.total}</p>
                  <p>discount: {purchase.discount}%</p>
                  <p>payMode: {purchase.payMode}</p>
                  <p style={{fontWeight:'bold',fontSize:'medium'}}><em>Grand Total:</em> {purchase.totalAmount}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <button onClick={() => {printPageArea('purchase')}}>Print</button>
        <button onClick={() => {downloadAsPdf('purchase',purchase.invoice)}}>Download as pdf</button> */}
        <br/>
        <Link to='/purchases'>Back</Link>
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    purchase: state.purchases.find((p) => p._id === props.match.params.id),
  }
}

export default connect(mapStateToProps)(PurchaseShow)
