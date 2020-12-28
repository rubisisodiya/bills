const express = require('express')
const router = express.Router()

// middleware
const {authenticateUser} = require('../app/middlewares/authenticateUser')

// controllers
const usersController = require('../app/controllers/usersController')
const categoriesController = require('../app/controllers/categoriesController')
const productsController = require('../app/controllers/productsController')
const billsController = require('../app/controllers/billsController')
const purchasesController = require('../app/controllers/purchasesController')
const expendituresController = require('../app/controllers/expendituresController')
const expenditureTypesController= require('../app/controllers/expenditureTypesController')
const stocksController= require('../app/controllers/stocksController')
const employeesController= require('../app/controllers/employeesController')
const customersController= require('../app/controllers/customersController')
const dealersController= require('../app/controllers/dealersController')


router.get('/users', usersController.list)
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/check-login',authenticateUser,usersController.checkLoginStatus)
router.put('/users/edit/:id',authenticateUser, usersController.update)
router.delete('/users/logout', authenticateUser, usersController.logout)
router.delete('/users/logout-all', authenticateUser, usersController.logoutAll)

router.get('/categories', categoriesController.list)
router.post('/categories', categoriesController.create)
router.put('/categories/edit/:id', categoriesController.update)
router.get('/categories/:id', categoriesController.show)
router.delete('/categories/:id', categoriesController.delete)

router.get('/products', productsController.list)
router.post('/products', productsController.create)
router.put('/products/edit/:id', productsController.update)
router.get('/products/:id', productsController.show)
router.delete('/products/:id', productsController.delete)

router.get('/bills', billsController.list)
router.post('/bills', billsController.create)
router.put('/bills/edit/:id', billsController.update)
router.get('/bills/:id', billsController.show)
router.delete('/bills/:id', billsController.delete)

router.get('/purchases', purchasesController.list)
router.post('/purchases', purchasesController.create)
router.put('/purchases/edit/:id', purchasesController.update)
router.get('/purchases/:id', purchasesController.show)
router.delete('/purchases/:id', purchasesController.delete)

router.get('/expenditures', expendituresController.list)
router.post('/expenditures', expendituresController.create)
router.put('/expenditures/edit/:id', expendituresController.update)
router.get('/expenditures/:id', expendituresController.show)
router.delete('/expenditures/:id', expendituresController.delete)

router.get('/expenditureTypes', expenditureTypesController.list)
router.post('/expenditureTypes', expenditureTypesController.create)
router.put('/expenditureTypes/edit/:id', expenditureTypesController.update)
router.get('/expenditureTypes/:id', expenditureTypesController.show)
router.delete('/expenditureTypes/:id', expenditureTypesController.delete)

router.get('/stocks', stocksController.list)
router.post('/stocks', stocksController.create)
router.put('/stocks/edit/:id', stocksController.update)
router.get('/stocks/:id', stocksController.show)
router.delete('/stocks/deleteAll', stocksController.destroy)
router.delete('/stocks/:id', stocksController.delete)

router.get('/employees', employeesController.list)
router.post('/employees', employeesController.create)
// router.put('/employees/edit/:id', employeesController.update)
// router.get('/employees/:id', employeesController.show)
router.delete('/employees/:id', employeesController.delete)

router.get('/customers', customersController.list)
router.post('/customers', customersController.create)
router.put('/customers/edit/:id', customersController.update)
//router.get('/customers/:id', customersController.show)
router.delete('/customers/:id', customersController.delete)

router.get('/dealers', dealersController.list)
router.post('/dealers', dealersController.create)
router.put('/dealers/edit/:id', dealersController.update)
//router.get('/dealers/:id', dealersController.show)
router.delete('/dealers/:id', dealersController.delete)



module.exports = router