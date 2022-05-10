const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')

// middlewares
const auth = require('../../middleware/auth')

// route GET api/auth
// @desc
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ msg: 'server error' })
  }
})

// route POST api/auth
// @desc Authenticate user and send token
// @access public

router.post(
  '/',
  //   middleware validating the req.body using express-validator
  [
    check('email', 'Please include a valid e-mail').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // console.log(req.body)

    // generating errors from validator and handling them with res
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    // if validator check passes then

    // destructuring from req.body
    const { email, password } = req.body

    try {
      // checking if user doesnt exist, if they dont then send err
      let user = await User.findOne({ email: email })
      console.log(user)
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
      }

      // compare the passwords if they exist

      const isMatch = await bcrypt.compare(password, user.password)

      // if dont exist send an error

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
      }

      // is user credentials are a match
      // create the payload for JWT which includes our users id from the db

      const payload = {
        user: {
          id: user.id,
        },
      }

      //  call jwt sign method, poss in the payload, the jwtsecret from our config we created, an argument for optional extra parameters such as expiry, a call back function which allows us to handle any errors that occur or send the response back to user.

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err
        res.json({ token: token, user: { ...user._doc, password: null } })
      })
    } catch (err) {
      console.error(err)

      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
