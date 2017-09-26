import { shallowEqual, deepEqual } from '../tools/objects'

let pureRender = true

export default (deep) => (component) => {
  if (deep) {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      if (!pureRender) return true
      return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState)
    }
  } else {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      if (!pureRender) return true
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    }
  }

  return component
}
