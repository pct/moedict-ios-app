class Tiapp.View.Definition

    constructor: (item) ->
        @item = item

        @view = $.View
            top: 10
            left: 0
            layout: 'horizontal'
            width: 300
            height: Ti.UI.SIZE

        @type = $.Label
            text: @item.type
            top: 5
            left: 5
            height: Ti.UI.SIZE
            backgroundColor: '#333'
            color: '#fff'
            borderRadius: 2

        @def = $.Label
            text: @item.def
            top: 5
            left: 5
            height: Ti.UI.SIZE

    render: ->
        @view.add @type
        @view.add @def

        @view

    destroy: ->
