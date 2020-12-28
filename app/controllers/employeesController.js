const EmployeeProfile = require('../models/EmployeeProfile')
const User = require('../models/User')

const employeesController = {}

employeesController.list = (req,res) => {
    EmployeeProfile.find({})
        .populate('profile', 'username email phone')
        .then(emp => {
            res.json(emp)
        })
        .catch(err => res.json(err))
}

employeesController.create = (req,res) => {
    const {body} = req
    const userAcc = {
        username: body.username,
        password: body.password,
        email: body.email,
        phone: body.phone
    }
    const user = new User(userAcc)
    user.save()
        .then(user => {
            const employee = new EmployeeProfile({
                profile: user._id,
                employeeId: body.employeeId,
                address: body.address,
                key: body.password
            })
            employee.save()
                .then(emp => {
                    EmployeeProfile.findOne({_id:emp._id})
                        .populate('profile', 'username email phone')
                        .then(emp => {
                            res.json(emp)
                        })
                }).catch(err => res.json(err))
                .catch(err => res.json(err))

        })

}

employeesController.delete = (req,res) => {
    const id = req.params.id
    EmployeeProfile.findByIdAndRemove({_id:id})
        .then(emp => {
            User.findByIdAndRemove({_id: emp.profile })
                .then()
                .catch(err => res.json(err))
            res.json(emp)
        }).catch(err => res.json(err))
}

module.exports = employeesController