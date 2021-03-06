import auth from 'utils/auth'

module.exports = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('app'),
    onEnter(nextState, replace) {
      if (!auth.isLogin()) {
        replace({
          pathname: '/login',
          state: {
            nextPathname: nextState.location.pathname
          }
        })
      }
    },
    getIndexRoute(location, callback) {
      require.ensure([], function (require) {
        callback(null, {
          component: require('app/dashboard')
        })
      })
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./articles'),
          require('./categories'),
          require('./settings'),
          require('./commodities'),
          require('./jobs')
        ])
      })
    }
  }, {
    path: 'login',
    component: require('app/login'),
    onEnter(nextState, replace) {
      if (auth.isLogin()) {
        replace('/')
      }
    }
  }]
}
