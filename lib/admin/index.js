const Admin = require('./admin')
const router = require('./routes')
const middleware = require('./middleware')

const params = router.params
const servers = router.servers
const routes = router.routes
const directives = router.directives

module.exports = function (opts) {
  opts = opts || {}

  const admin = new Admin(opts)

  /**
   * Setup middleware functions
   */

  if (opts.cors) {
    admin.use(middleware.cors)
  }

  admin.use(middleware.admin(admin))
  admin.use(middleware.body)
  admin.use(middleware.reply)
  admin.use(middleware.authorization)

  if (opts.middleware) {
    opts.middleware.forEach(admin.use, admin)
  }

  /**
   * Configure param-based middleware
   */

  admin.param('serverId', params.serverParam)
  admin.param('routeId', params.routeParam)
  admin.param('poisonId', params.poisonParam)
  admin.param('ruleId', params.ruleParam)

  /**
   * Define the HTTP API
   */

  admin.get('/', router.root)

  /**
   * Servers
   */

  admin.get('/servers', servers.all)
  admin.get('/servers/:serverId', servers.get)
  admin.delete('/servers/:serverId', servers.delete)

  /**
   * Global rules
   */

  admin.get('/servers/:serverId/rules', directives.allRules)
  admin.post('/servers/:serverId/rules', directives.createRule)
  admin.delete('/servers/:serverId/rules', directives.deleteRules)

  admin.get('/servers/:serverId/rules/:ruleId', directives.getRule)
  admin.delete('/servers/:serverId/rules/:ruleId', directives.deleteRule)

  /**
   * Global poisons
   */

  admin.get('/servers/:serverId/poisons', directives.allPoisons)
  admin.post('/servers/:serverId/poisons', directives.createPoison)
  admin.delete('/servers/:serverId/poisons', directives.deletePoisons)

  admin.get('/servers/:serverId/poisons/:poisonId', directives.getPoison)
  admin.delete('/servers/:serverId/poisons/:poisonId', directives.deletePoison)

  admin.get('/servers/:serverId/poisons/:poisonId/rules', directives.allRules)
  admin.post('/servers/:serverId/poisons/:poisonId/rules', directives.createRule)
  admin.delete('/servers/:serverId/poisons/:poisonId/rules', directives.deleteRules)
  admin.get('/servers/:serverId/poisons/:poisonId/rules/:ruleId', directives.getRule)

  /**
   * Routes
   */

  admin.get('/servers/:serverId/routes', routes.all)
  admin.post('/servers/:serverId/routes', routes.create)
  admin.delete('/servers/:serverId/routes', routes.delete)

  admin.get('/servers/:serverId/routes/:routeId', routes.get)
  admin.delete('/servers/:serverId/routes/:routeId', routes.deleteRoute)

  /**
   * Route rules
   */

  admin.get('/servers/:serverId/routes/:routeId/rules', directives.allRules)
  admin.post('/servers/:serverId/routes/:routeId/rules', directives.createRule)
  admin.delete('/servers/:serverId/routes/:routeId/rules', directives.deleteRules)
  admin.get('/servers/:serverId/routes/:routeId/rules/:ruleId', directives.getRule)
  admin.delete('/servers/:serverId/routes/:routeId/rules/:ruleId', directives.deleteRule)

  /**
   * Route poisons
   */

  admin.get('/servers/:serverId/routes/:routeId/poisons', directives.allPoisons)
  admin.post('/servers/:serverId/routes/:routeId/poisons', directives.createPoison)
  admin.delete('/servers/:serverId/routes/:routeId/poisons', directives.deletePoisons)
  admin.get('/servers/:serverId/routes/:routeId/poisons/:poisonId', directives.getPoison)
  admin.delete('/servers/:serverId/routes/:routeId/poisons/:poisonId', directives.deletePoison)

  admin.get('/servers/:serverId/routes/:routeId/poisons/:poisonId/rules', directives.allRules)
  admin.post('/servers/:serverId/routes/:routeId/poisons/:poisonId/rules', directives.createRule)
  admin.delete('/servers/:serverId/routes/:routeId/poisons/:poisonId/rules', directives.deleteRules)
  admin.get('/servers/:serverId/routes/:routeId/poisons/:poisonId/rules/:ruleId', directives.getRule)
  admin.delete('/servers/:serverId/routes/:routeId/poisons/:poisonId/rules/:ruleId', directives.deleteRule)

  return admin
}

module.exports.Admin = Admin
