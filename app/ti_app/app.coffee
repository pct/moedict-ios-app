root = @

Tiapp = root.Tiapp =
  App: {}
  Model: {}
  View: {}
  Window: {}


SEARCH_SERVER = 'http://localhost:3000'

class Tiapp.App
  run: ->
      main = new Tiapp.Window.Main().render()
      main.open()

