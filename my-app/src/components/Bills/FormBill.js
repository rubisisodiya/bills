import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { object, string, ref, number, array } from 'yup'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import Add from '@material-ui/icons/Add'
import {
  Button,
  TextField,
  Box,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Tooltip
} from '@material-ui/core'
import moment from 'moment'
import CustomerAdd from '../AllUsers/Customers/CustomerAdd'
import { getStocksList } from './../../actions/stock'
import '../../config/FormikForm.css'
import { startAddBill } from '../../actions/bill'

const registerSchema = object().shape({
  availableStock: number().positive('The product is currently unavailable'),
  quantity: number().positive().lessThan(ref('availableStock'),'Quantity exceeds available stock'),
  customer: string().required(),
  payMode: string().required(),
  tax: number().required().min(0,'Must be a positive number'),
  discount: number().required().min(0,'Must be a positive number'),
  otherCharges: number().required().min(0,'Must be a positive number'),
  products: array().min(1,'Billing Cart is empty')
})

function Tabular(props){
  const { data, values, setFieldValue, handleRemoveProduct } = props
  return(
    <div>
        <table border='1' style={{borderCollapse:'collapse'}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{
                data.map((product,i) => {
                    return (<tr key={i}>
                        <td>{i+1}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.price*product.quantity}</td>
                        <td><Button type='button' onClick={() => handleRemoveProduct(product.product,values,setFieldValue)}>Remove</Button></td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    </div>
  )
}

function FormBill(props) {
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const modalStatus = () => {
    setModalIsOpen(!modalIsOpen)
  }
  useEffect(() => {
    props.dispatch(getStocksList())
    // eslint-disable-next-line
  }, [])

  const productChange = (e, values, setFieldValue) => {
    const product = props.products.find(
      (product) => product._id === e.target.value
    )
    const stock = props.stocks.find(
      (stock) => stock.product._id === product._id
    )
    setFieldValue('_id', product._id)
    setFieldValue('price', stock.stockPrice)
    if(stock.quantity){
      setFieldValue('quantity', 1)
    }else{
      setFieldValue('quantity', 0)
    }
    setFieldValue('name', product.name)
    setFieldValue('stock', product.stock)
    setFieldValue('availableStock', stock.quantity)
  }
  const addToBillList = (e,values,setFieldValue) => {
    e.preventDefault()
    console.log(values,setFieldValue)
    if (values._id) {
      setFieldValue('products',values.products.concat({
        product: values._id,
        price: values.price,
        quantity: values.quantity,
        stock: values.stock,
        name: values.name,
      }))
      setFieldValue('_id','')
      setFieldValue('name','')
      setFieldValue('price','')
      setFieldValue('quantity','')
      setFieldValue('stock','')
      setFieldValue('availableStock','')
      setFieldValue('total',Number(values.total) +
      Number(values.price) * Number(values.quantity))
      setFieldValue('totalAmount',Number(values.total) +
      Number(values.price) * Number(values.quantity))
    }
  }
  const handleRemoveProduct = (id,values,setFieldValue) => {
    const product = values.products.find(p => p.product === id)
    setFieldValue('total',values.total - product.price * product.quantity)
    setFieldValue('totalAmount',values.totalAmount - product.price * product.quantity)
    setFieldValue('products',values.products.filter(product => product.product !== id))
  }

  const taxBlur = (values,setFieldValue) => {
    const amount = values.products
      .map((p) => p.price * p.quantity)
      .reduce((a, b) => {
        return a + b
      }, 0)
    setFieldValue('total',Number(amount) + (Number(amount) * Number(values.tax)) / 100)
    setFieldValue('totalAmount',Number(amount) + (Number(amount) * Number(values.tax)) / 100)
  }

  const discountBlur = (values,setFieldValue) => {
    setFieldValue('totalAmount',Number(values.totalAmount) -
    (Number(values.total) * Number(values.discount)) / 100)
  }

  const otherChargesBlur = (values,setFieldValue) => {
    setFieldValue('totalAmount',Number(values.totalAmount) + Number(values.otherCharges))
  }
  Modal.setAppElement('#root')

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          products: [],
          _id: '',
          stock: '',
          name: '',
          price: '',
          quantity: '',
          date: moment(Date.now()).format('YYYY-MM-DD'),
          customer: '',
          description: '',
          total: '',
          discount: 0,
          tax: 0,
          otherCharges: 0,
          payMode: 'Cash',
          totalAmount: '',
          paymentDetails: '',
          availableStock: '',
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const regEnable = () => {
            setSubmitting(false)
            resetForm()
          }
          const  {
              products,
              date,
              customer,
              total,
              paymentDetails,
              tax,
              description,
              otherCharges,
              payMode,
              discount,
              totalAmount,
          } = values
          const fd = {
            products,
              date,
              customer,
              total,
              paymentDetails,
              tax,
              description,
              otherCharges,
              payMode,
              discount,
              totalAmount,
          }
          //console.log(fd, setSubmitting)
          props.dispatch(startAddBill(fd,regEnable))
        }}
      >
        {({
          isSubmitting,
          handleChange,
          values,
          errors,
          touched,
          isValid,
          setFieldValue,
          resetForm
        }) => (
          <Fragment>
            <div className='formBill-formik'>
              <Form>
                <div className='formBill-formik-addProduct'>
                  <Box marginBottom={2}>
                    <FormGroup>
                      <FormControl variant='outlined'>
                        <InputLabel id='selectProduct'>
                          Select Product
                        </InputLabel>
                        <Select
                          className='formBill-formik-select'
                          labelId='selectProduct'
                          name='_id'
                          value={values._id}
                          onChange={(e, values) =>
                            productChange(e, values, setFieldValue)
                          }
                          label='Select Product'
                        >
                          <MenuItem value=''>
                            <em>Select</em>
                          </MenuItem>
                          {props.products.map((product, i) => {
                            return (
                              <MenuItem key={product._id} value={product._id}>
                                {product.name}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Box>
                  <Box marginBottom={2}>
                    <FormGroup>
                      <Field
                        //error={touched.username && Boolean(errors.username)}
                        type='number'
                        value={values.price}
                        name='price'
                        label='Price'
                        variant='outlined'
                        as={TextField}
                        //helperText={touched.username && errors.username}
                      />
                    </FormGroup>
                  </Box>
                  <Box marginBottom={2}>
                    <FormGroup>
                      <Field
                        error={Boolean(errors.availableStock)}
                        helperText={errors.availableStock}
                        type='number'
                        name='availableStock'
                        label='Available'
                        variant='outlined'
                        value={values.availableStock}
                        as={TextField}
                        readOnly={true}
                        disabled
                      />
                    </FormGroup>
                  </Box>
                  <Box marginBottom={2}>
                    <FormGroup>
                    <Field
                        error={touched.quantity && Boolean(errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                        type='number'
                        name='quantity'
                        label='Quantity'
                        variant='outlined'
                        value={values.quantity}
                        as={TextField}
                        disabled={!Boolean(values.availableStock)}
                      />
                    </FormGroup>
                  </Box>
                  <Box marginBottom={2}>
                    <FormGroup>
                        <Button
                          variant='contained'
                          color='primary'
                          type='button'
                          className='formik-formBill-addProBtn'
                          disabled={!Boolean(values.availableStock)}
                          onClick={(e)=>addToBillList(e,values,setFieldValue)}
                        >
                        Add to Bill
                      </Button>
                    </FormGroup>
                  </Box>
                </div>
                <div>
                  {(!Boolean(errors.products) ) && <p style={{color:'red'}}>{errors.products}</p>}
                  {values.products.length>0 && (
                        <Fragment>
                          <h3>Billing Cart</h3>
                          <Tabular 
                            data={values.products} 
                            values={values} 
                            setFieldValue={setFieldValue} 
                            handleRemoveProduct={handleRemoveProduct}
                          />
  {/* --------------------------Billing form ----------------------------------------------*/}
                          <div className='formik-formBill-makeBill'>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    //error={touched.email && Boolean(errors.email)}
                                    //helperText={touched.email && errors.email}
                                    type='date'
                                    name='date'
                                    label='Date'
                                    variant='outlined'
                                    value={values.date}
                                    as={TextField}
                                  />
                                </FormGroup>
                              </Box>
                              <Box marginBottom={2}>
                              <FormGroup>
                                <FormControl variant='outlined'>
                                  <InputLabel id='selectCustomer'>
                                    Select Customer
                                  </InputLabel>
                                  <Select
                                    error={touched.customer && Boolean(errors.customer)}
                                    //helperText={touched.customer && errors.customer}
                                    className='formBill-formik-select'
                                    labelId='selectCustomer'
                                    name='customer'
                                    value={values.customer}
                                    label='Select Customer'
                                    onChange={handleChange}
                                  >
                                    <MenuItem value=''>
                                      <em>Select</em>
                                    </MenuItem>
                                    {props.customers.map((customer, i) => {
                                      return (
                                        <MenuItem key={customer._id} value={customer._id}>
                                          {customer.name}
                                        </MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>
                              </FormGroup>
                            </Box>
                            <Modal 
                                style={modalStyles}
                                isOpen={modalIsOpen}
                                // onAfterOpen={this.afterOpenModal}
                                onRequestClose={modalStatus}
                                aria-labelledBy="Create Category"
                                aria-describedBy="simple-modal-description"
                            >
                                <CustomerAdd 
                                    modalStatus={modalStatus}
                                />
                            </Modal>
                            <IconButton className='makeBill-add-cus-btn' onClick={modalStatus}>
                                <Tooltip title='Add Customer' placement='top'>
                                  <Add />
                                </Tooltip>
                            </IconButton>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    //error={touched.email && Boolean(errors.email)}
                                    //helperText={touched.email && errors.email}
                                    type='text'
                                    name='description'
                                    label='Description'
                                    variant='outlined'
                                    value={values.description}
                                    as={TextField}
                                  />
                                </FormGroup>
                              </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    error={Boolean(errors.tax)}
                                    helperText={errors.tax}
                                    type='number'
                                    name='tax'
                                    label='Tax'
                                    variant='outlined'
                                    value={values.tax}
                                    as={TextField}
                                    onBlur={() => {taxBlur(values,setFieldValue)}}
                                  />
                                </FormGroup>
                              </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    //error={touched.email && Boolean(errors.email)}
                                    //helperText={touched.email && errors.email}
                                    type='number'
                                    name='total'
                                    label='Total'
                                    variant='outlined'
                                    value={values.total}
                                    as={TextField}
                                  />
                                </FormGroup>
                              </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    error={touched.discount && Boolean(errors.discount)}
                                    helperText={touched.discount && errors.discount}
                                    type='number'
                                    name='discount'
                                    label='Discount'
                                    variant='outlined'
                                    value={values.discount}
                                    as={TextField}
                                    onBlur={() => discountBlur(values,setFieldValue)}
                                  />
                                </FormGroup>
                              </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    error={touched.otherCharges && Boolean(errors.otherCharges)}
                                    helperText={touched.otherCharges && errors.otherCharges}
                                    type='number'
                                    name='otherCharges'
                                    label='OtherCharges'
                                    variant='outlined'
                                    value={values.otherCharges}
                                    as={TextField}
                                    onBlur={() => otherChargesBlur(values,setFieldValue)}
                                  />
                                </FormGroup>
                              </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    //error={touched.email && Boolean(errors.email)}
                                    //helperText={touched.email && errors.email}
                                    type='number'
                                    name='totalAmount'
                                    label='Total Amount'
                                    variant='outlined'
                                    value={values.totalAmount}
                                    as={TextField}
                                  />
                                </FormGroup>
                              </Box>
                              <Box marginBottom={2}>
                              <FormGroup>
                                <FormControl variant='outlined'>
                                  <InputLabel id='payment'>
                                    Payment Mode
                                  </InputLabel>
                                  <Select
                                    error={Boolean(errors.payMode)}
                                    //helperText={errors.payMode}
                                    className='formBill-formik-select'
                                    labelId='payment'
                                    name='payMode'
                                    value={values.payMode}
                                    label='Select Customer'
                                    onChange={handleChange}
                                  >
                                    <MenuItem value=''>
                                      <em>Select</em>
                                    </MenuItem>
                                    {['Net-Banking', 'Cash', 'UPI', 'Cheque'].map((pay, i) => {
                                      return (
                                        <MenuItem key={i} value={pay}>
                                          {pay}
                                        </MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>
                              </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field
                                    //error={touched.email && Boolean(errors.email)}
                                    //helperText={touched.email && errors.email}
                                    type='text'
                                    name='paymentDetails'
                                    label='Payment Details'
                                    variant='outlined'
                                    value={values.paymentDetails}
                                    as={TextField}
                                  />
                                </FormGroup>
                              </Box>
                          </div>
                          <div className='formik-formBill-makeBillAction'>
                              <Button 
                                  variant='contained'
                                  color='primary'
                                  type='reset'
                                  //className='btn-register'
                                  className='formik-formBill-submit-btn' 
                                  onClick={() => resetForm()}
                                  >Clear</Button>
                                <Button 
                                  variant='contained'
                                  color='primary'
                                  type='submit'
                                  //className='btn-register'
                                  disabled={isSubmitting}
                                  className='formik-formBill-submit-btn' 
                                >Bill</Button>
                          </div>
                      </Fragment>
                    )
                  }
                </div>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre>
                <pre>{JSON.stringify(isSubmitting, null, 4)}</pre>
                <pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(isValid, null, 4)}</pre> */}
              </Form>
            </div>
          </Fragment>
        )}
      </Formik>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    customers: state.customers,
    stocks: state.stocks,
  }
}

export default connect(mapStateToProps)(FormBill)
