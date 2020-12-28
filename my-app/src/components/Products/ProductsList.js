import React from 'react'
import { connect } from 'react-redux'
import {
  startAddProduct,
  startRemoveProduct,
  startUpdateProduct,
  startListProducts,
} from '../../actions/product'
import ProductForm from './ProductForm'
import Add from '@material-ui/icons/Add'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import IconButton from '@material-ui/core/IconButton'
import Swal from 'sweetalert2'
import axios from '../../config/axios'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      isEdit: false,
      product: {},
    }
  }
  productDelete = (e) => {
    const id = e.target.value
    this.props.dispatch(startRemoveProduct(id))
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
  modalOpen = () => {
    this.setState({ modalIsOpen: true })
  }
  // this.Modal.setAppElement('#root')
  productPost = (data) => {
    this.props.dispatch(startAddProduct(data))
  }
  productUpdate = (e) => {
    e.preventDefault()
    this.setState({
      isEdit: true,
      product: this.props.products.find(
        (product) => product._id === e.target.id
      ),
    })
  }
  productPut = (data) => {
    const id = data._id
    this.props.dispatch(startUpdateProduct(id, data, this.props.history))
  }
  handleChange = (e) => {
    e.persist()
    this.setState((prevState) => {
      return {
        product: {
          ...prevState.product,
          [e.target.name]: e.target.value,
        },
      }
    })
  }
  updateProduct = (data) => {
    // console.log(data)
    axios
      .put(`/products/edit/${data._id}`, data, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((res) => {
        if (res.data.errors) {
          Swal.fire({
            type: 'error',
            text: 'Check the fileds',
          })
        } else {
          this.setState({ product: {} })
          this.props.dispatch(startListProducts())
        }
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          text: err,
        })
      })
  }
  render() {
    const { modalIsOpen } = this.state
    Modal.setAppElement('#root')
    return (
      <>
        <Modal
          style={modalStyles}
          isOpen={modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          aria-labelledBy='Create Product'
          aria-describedBy='simple-modal-description'
        >
          <ProductForm productPost={this.productPost} />
        </Modal>
        <IconButton className='tableButton' onClick={this.modalOpen}>
          <Add />
        </IconButton>
        <h3>Products </h3>
        <div className='row'>
          {this.props.products.map((product, index) => {
            // return <li key={index}> {product.name}</li>
            return (
              <div key={index}>
                <div className='card' style={{ width: '18rem' }}>
                  <div className='card-body product-body'>
                    {this.state.product._id === product._id ? (
                      <ProductForm
                        productPut={this.updateProduct}
                        isEdit={this.state.isEdit}
                        {...product}
                      />
                    ) : (
                      <div className='product-card'>
                        <h5 className='card-title'>{product.name}</h5>
                        <p>Description: {product.description}</p>
                        <p><em><b>Price:</b></em> {product.price}</p>
                        <button
                          className='btn btn-sm btn-info'
                          id={product._id}
                          onClick={this.productUpdate}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-sm btn-danger'
                          value={product._id}
                          onClick={this.productDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state',state)
  return {
    categories: state.categories,
    products: state.products,
  }
}

export default connect(mapStateToProps)(ProductList)
