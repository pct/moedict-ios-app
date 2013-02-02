root = @

Tiapp = root.Tiapp =
  App: {}
  Model: {}
  View: {}
  Window: {}


SEARCH_SERVER = 'http://moedict-api.4point-inc.com'

class Tiapp.App
  run: ->
      main = new Tiapp.Window.Main().render()
      main.open()

