Client.rooms.interface.chat.history = new function() {
    this.$element = $(
        '<div class="room-interface-chat-history">' +
            '<div class="room-interface-chat-history-messages">' +
                '<div class="room-interface-chat-history-messages-content"></div>' +
            '</div>' +

            '<div class="room-interface-chat-history-handle">' +
                '<div class="room-interface-chat-history-button"></div>' +
            '</div>' +
        '</div>'
    ).appendTo(Client.rooms.interface.$element);

    this.$messages = this.$element.find(".room-interface-chat-history-messages-content");

    this.$button = this.$element.find(".room-interface-chat-history-button");

    this.mouseDown = false;
    this.mousePosition = false;
    this.mouseMove = function(event) {
        if(!Client.rooms.interface.chat.history.mouseDown)
            return;

        const height = (Client.rooms.interface.chat.history.$element.height() + (event.clientY - Client.rooms.interface.chat.history.mousePosition));

        if(height < 30 || height > $(window).height() / 2)
            return;

        Client.rooms.interface.chat.history.$messages[0].scrollTop += (Client.rooms.interface.chat.history.$element.height() - height);

        Client.rooms.interface.chat.history.$element.css({
            "height": height + "px"
        });

        Client.rooms.interface.chat.history.mousePosition = event.clientY;
    };
    this.mouseUp = function(event) {
        if(!Client.rooms.interface.chat.history.mouseDown)
            return;

        Client.rooms.interface.chat.history.mouseDown = false;

        $(window).unbind("mouseup", Client.rooms.interface.chat.history.mouseUp);
        $(window).unbind("mousemove", Client.rooms.interface.chat.history.mouseMove);
    };

    this.$button.on("mousedown", function(event) {
        Client.rooms.interface.chat.history.mouseDown = true;

        Client.rooms.interface.chat.history.mousePosition = event.clientY;

        $(window).bind("mouseup", Client.rooms.interface.chat.history.mouseUp);
        $(window).bind("mousemove", Client.rooms.interface.chat.history.mouseMove);
    });

    this.messages = [];

    this.addMessage = function(image, left) {
        const previousScroll = this.$messages[0].scrollTop;

        const $canvas = $('<canvas class="room-interface-chat-message" width="' + image.width + '" height="' + image.height + '"></canvas>').css("margin-left", Client.rooms.interface.entity.offset[0] + left).appendTo(this.$messages);
        const context = $canvas[0].getContext("2d");

        context.drawImage(image, 0, 0);

        this.$messages[0].scrollTop += (this.$messages[0].scrollHeight - previousScroll);
        
        this.messages.push($canvas);
    };
};
