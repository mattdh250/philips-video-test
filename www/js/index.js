var app = {
    $video: null,
    remoteVideoUrl: "http://techslides.com/demos/sample-videos/small.mp4",

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        var self = this;
        this.writeMessage("Device Ready.");
        $video = $("#vidPlayer");
        this.bindEventListeners();
        self.writeMessage('Starting remote video playback in 5 seconds');
        setTimeout(function () {
            self.playVideo(self.remoteVideoUrl);
        }, 5000);

    },
    bindEventListeners: function () {
        // Bind Video events
        var self = this;
        $video.on('error', function (e) {
            self.writeMessage('Error loading video: ' + e);
        });
        $video.on('loadedmetadata', function () {
            self.writeMessage('Loaded Meta Data');
        });
        $video.on('canplaythrough', function () {
            self.writeMessage('Can play through video');
        });
        $video.on('canplay', function () {
            self.writeMessage('Can play video');
        });
        $video.on('playing', function () {
            self.writeMessage('Playing Video');
        });
        $video.on('ended', function () {
            self.writeMessage('Video Ended');
            self.playVideo(self.remoteVideoUrl);
        });

        // Links
        $("#remoteVideoLink").on('click', function () {
            self.playVideo(self.remoteVideoUrl);
        });

    },
    playVideo: function (url) {
        this.writeMessage('Attempting to play video: ' + url);
        $video.attr('src', url);
        $video[0].play();
    },
    writeMessage: function (message) {
        $('#console').append("<p class='black'>" + message + "</p>");
        console.log(message);
    }
};

app.initialize();