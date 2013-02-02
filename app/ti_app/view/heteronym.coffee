class Tiapp.View.Heteronym

    constructor: (item) ->
        @item = item

        @view = $.View
            top: 20
            left: 10
            bottom: 30
            layout: 'vertical'
            height: Ti.UI.SIZE

        @bopomofo = $.Label
            text: "[注音一式]#{@item.bopomofo}"
            top: 5
            left: 5
            color: '#333'
            height: Ti.UI.SIZE

        @bopomofo2 = $.Label
            text: "[注音二式]#{@item.bopomofo2}"
            top: 5
            left: 5
            color: '#333'
            height: Ti.UI.SIZE

        @pinyin = $.Label
            text: "[漢語拼音]#{@item.pinyin}"
            top: 5
            left: 5
            color: '#333'
            height: Ti.UI.SIZE

    render: ->
        @view.add @bopomofo
        @view.add @bopomofo2
        @view.add @pinyin if @item.pinyin

        if @item.definitions and @item.definitions.length > 0
           _.each @item.definitions, (definition, num) =>
              definition_view = new Tiapp.View.Definition(definition).render()
              @view.add definition_view
       
        @view
