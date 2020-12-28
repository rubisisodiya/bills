import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { object, string, number, array } from 'yup'
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
  Tooltip,
} from '@material-ui/core'
import moment from 'moment'
import '../../config/FormikForm.css'
import DealerAdd from '../AllUsers/Dealers/DealerAdd'
import { getStocksList } from '../../actions/stock'
import { startAddPurchase } from '../../actions/purchase'

const registerSchema = object().shape({
  quantity: number().positive(),
  dealer: string().required(),
  payMode: string().required(),
  tax: number().required().min(0, 'Must be a positive number'),
  discount: number().required().min(0, 'Must be a positive number'),
  otherCharges: number().required().min(0, 'Must be a positive number'),
  products: array().min(1, 'Billing Cart is empty'),
})

function Tabular(props) {
  const {data,values,setFieldValue,handleRemoveProduct } = props
  return (
    <div>
      <table border='1' style={{ borderCollapse: 'collapse' }}>
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
        <tbody>
          {data.map((product, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.price * product.quantity}</td>
                <td>
                  <Button
                    type='button'
                    onClick={() =>
                      handleRemoveProduct(
                        product.product,
                        values,
                        setFieldValue
                      )
                    }
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function FormPurchase(props) {
  const [ tempId, setTempId ] = useState('')
  const [ newField, setNewField ] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const modalStatus = () => {
    setModalIsOpen(!modalIsOpen)
  }

  const generateTempId = () => {
    let genId = JSON.stringify(Number(Date.now())).substring(0,12)
    setTempId(genId)
  }

  useEffect(() => {
    props.dispatch(getStocksList())
    generateTempId()
    // eslint-disable-next-line
  },[])

  const productChange = (e,values,setFieldValue) => {
    const product = props.products.find(
      (product) => product._id === e.target.value
    )
    if(product){
      const stock = props.stocks.find(
        (stock) => stock.product._id === product._id
      )
      setFieldValue('_id', product._id)
      setFieldValue('price', product.price)
      setFieldValue('quantity', 1)
      setFieldValue('name', product.name)
      setFieldValue('stock', product.stock)
      setFieldValue('availableStock', stock.quantity)
      setNewField(false)
      console.log(product,stock)
    }
    else{
      setFieldValue('_id', tempId)
      setFieldValue('price', 0)
      setFieldValue('quantity', 1)
      setFieldValue('name', '')
      setFieldValue('stock', 0)
      setFieldValue('availableStock', 0)
      setNewField(true)
    }
  }

  const addToPurchaseList = (e,values,setFieldValue) => {
    e.preventDefault()
    generateTempId()
    //console.log(values,setFieldValue)
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
    setNewField(false)
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
        //enableReinitialize={true}
        initialValues={{
          products: [],
          _id: '',
          stock: '',
          name: '',
          price: '',
          quantity: '',
          date: moment(Date.now()).format('YYYY-MM-DD'),
          dealer: '',
          description: '',
          total: '',
          discount: 0,
          tax: 0,
          otherCharges: 0,
          payMode: 'Cash',
          totalAmount: '',
          paymentDetails: '',
          availableStock: '',
          tempId: tempId
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const regEnable = () => {
            setSubmitting(false)
            resetForm()
          }
          const {
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
          console.log(fd, setSubmitting)
          props.dispatch(startAddPurchase(fd, regEnable))
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
          resetForm,
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
                          <MenuItem value={tempId}>Add new product</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Box>
                  {
                    newField && (
                      <Box marginBottom={2}>
                        <FormGroup>
                          <Field
                            //error={touched.username && Boolean(errors.username)}
                            type='text'
                            value={values.name}
                            name='name'
                            label='New product name'
                            variant='outlined'
                            as={TextField}
                            //helperText={touched.username && errors.username}
                          />
                        </FormGroup>
                      </Box>
                    )
                  }
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
                  {!newField && (
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          error={Boolean(errors.availableStock)}
                          helperText={errors.availableStock}
                          type='number'
                          name='availableStock'
                          label='Available Stock'
                          variant='outlined'
                          value={values.availableStock}
                          as={TextField}
                          readOnly={true}
                          disabled
                        />
                      </FormGroup>
                    </Box>
                  )}
                  <Box marginBottom={2}>
                    <FormGroup>
                      <Field
                        error={touched.quantity && Boolean(errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                        type='number'
                        name='quantity'
                        label='Buy quantity'
                        variant='outlined'
                        value={values.quantity}
                        as={TextField}
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
                        onClick={(e)=>addToPurchaseList(e,values,setFieldValue)}
                      >
                        Add to Purchase
                      </Button>
                    </FormGroup>
                  </Box>
                </div>
                <div>
                  {!Boolean(errors.products) && (
                    <p style={{ color: 'red' }}>{errors.products}</p>
                  )}
                  {values.products.length > 0 && (
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
                              <InputLabel id='selectDealer'>
                                Select Dealer
                              </InputLabel>
                              <Select
                                error={
                                  touched.dealer && Boolean(errors.dealer)
                                }
                                //helperText={touched.dealer && errors.dealer}
                                className='formBill-formik-select'
                                labelId='selectDealer'
                                name='dealer'
                                value={values.dealer}
                                label='Select Dealer'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Select</em>
                                </MenuItem>
                                {props.dealers.map((dealer, i) => {
                                  return (
                                    <MenuItem
                                      key={dealer._id}
                                      value={dealer._id}
                                    >
                                      {dealer.dealerName}
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
                          aria-labelledBy='Create Category'
                          aria-describedBy='simple-modal-description'
                        >
                          <DealerAdd modalStatus={modalStatus} />
                        </Modal>
                        <IconButton
                          className='makeBill-add-cus-btn'
                          onClick={modalStatus}
                        >
                          <Tooltip title='Add Dealer' placement='top'>
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
                              onBlur={() => {
                                taxBlur(values, setFieldValue)
                              }}
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
                              error={
                                touched.discount && Boolean(errors.discount)
                              }
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
                              error={
                                touched.otherCharges &&
                                Boolean(errors.otherCharges)
                              }
                              helperText={
                                touched.otherCharges && errors.otherCharges
                              }
                              type='number'
                              name='otherCharges'
                              label='OtherCharges'
                              variant='outlined'
                              value={values.otherCharges}
                              as={TextField}
                              onBlur={() =>
                                otherChargesBlur(values,setFieldValue)
                              }
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
                              <InputLabel id='payment'>Payment Mode</InputLabel>
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
                                {['Net-Banking', 'Cash', 'UPI', 'Cheque'].map(
                                  (pay, i) => {
                                    return (
                                      <MenuItem key={i} value={pay}>
                                        {pay}
                                      </MenuItem>
                                    )
                                  }
                                )}
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
                        >
                          Clear
                        </Button>
                        <Button
                          variant='contained'
                          color='primary'
                          type='submit'
                          //className='btn-register'
                          disabled={isSubmitting}
                          className='formik-formBill-submit-btn'
                        >
                          Purchase
                        </Button>
                      </div>
                    </Fragment>
                  )}
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
  //console.log(state)
  return {
    products: state.products,
    dealers: state.dealers,
    stocks: state.stocks,
  }
}

export default connect(mapStateToProps)(FormPurchase)
