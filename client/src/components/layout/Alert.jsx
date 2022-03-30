import React from 'react'
import { connect } from 'react-redux'
import { removeAlert } from '../../actions/alert'
import propTypes from 'prop-types'
import MotionDiv from './MotionDiv'
import { AnimatePresence, motion } from 'framer-motion'

const Alert = (props) => {
  const { alerts, removeAlert } = props
  return (
    <motion.div
      transition={{
        duration: 0.3,
      }}
      layout
      className="alertContainer"
      style={
        alerts !== null && alerts.length > 0
          ? {}
          : {
              width: '18rem',
              height: '3rem',
              pointerEvents: 'none',
              alignItems: 'flex-start',
            }
      }
    >
      <AnimatePresence>
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert) => {
            return (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                }}
                className={`alert -${alert.alertType}`}
                key={alert.id}
              >
                {alert.msg}
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="deleteAlert"
                >
                  Ok
                </button>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </motion.div>
  )
}

Alert.propTypes = {
  alerts: propTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, { removeAlert })(Alert)
