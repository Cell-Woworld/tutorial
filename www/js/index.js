/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        this.init_firebasex();
    },

    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
        switch (id) {
            case 'deviceready':
                if (typeof(device) !== 'undefined') {
                    this.get_device_id();
                }
                else
                {
                    var _get_device_id_timer = window.setInterval((self) => {
                        if (typeof(device) !== 'undefined') {
                            clearInterval(_get_device_id_timer);
                            self.get_device_id();
                        }
                    }, 1000, this);
                }
                break;
        }
    },

    get_device_id: function() {
        var _output = 'Device Model: ' + device.model + '\n' +
        'Device Cordova: ' + device.cordova + '\n' +
        'Device Platform: ' + device.platform + '\n' +
        'Device UUID: ' + device.uuid + '\n' +
        'Device Version: ' + device.version + '\n';
        console.log(_output);
        if (device.uuid.length == 16) {
            deviceId = this.uuid_ascii_to_hexa(device.uuid);
        }
        else {
            deviceId = device.uuid;
        }
    },

    uuid_ascii_to_hexa: function (str) {
        var sec = [4, 2, 2, 2, 6];
        var arr1 = [];
        var pos = 0;
        for (var m = 0, k = sec.length; m < k; m++) {
            for (var n = 0, l = sec[m]; n < l; n++) {
                var hex = Number(str.charCodeAt(pos)).toString(16);
                arr1.push(hex);
                pos++;
            }
            if (m < k - 1) {
                arr1.push('-');
            }
        }
        return arr1.join('');
    },

    init_firebasex: function() {
        FirebasePlugin = window.FirebasePlugin;
        //Register handlers
        var _self = this;
        FirebasePlugin.onMessageReceived(function(message) {
            try{
                console.log("onMessageReceived");
                console.dir(message);
                if(message.messageType === "notification"){
                    _self.handleNotificationMessage(message);
                }else{
                    _self.handleDataMessage(message);
                }
            }catch(e){
                console.log("Exception in onMessageReceived callback: "+e.message);
            }

        }, function(error) {
            console.log("Failed receiving FirebasePlugin message", error);
        });

        FirebasePlugin.onTokenRefresh(function(token){
            console.log("Token refreshed: " + token)
            //userToken = token;
        }, function(error) {
            console.log("Failed to refresh token", error);
        });
        this.checkNotificationPermission(false); // Check permission then get token
        if(cordova.platformId === "android"){
            this.initAndroid();
        }else if(cordova.platformId === "ios"){
            this.initIos();
        };
    },

    initIos: function(){
        FirebasePlugin.onApnsTokenReceived(function(token){
            console.log("APNS token received: " + token)
        }, function(error) {
            console.log("Failed to receive APNS token", error);
        });
    },
    
    initAndroid: function(){
    
        // Define custom  channel - all keys are except 'id' are optional.
        var customChannel  = {
            // channel ID - must be unique per app package
            id: "29E34734-0E93-4266-97E1-A01887B0BBE1",
    
            // Channel name. Default: empty string
            name: "Just Do It",
    
            //The sound to play once a push comes. Default value: 'default'
            //Values allowed:
            //'default' - plays the default notification sound
            //'ringtone' - plays the currently set ringtone
            //filename - the filename of the sound file located in '/res/raw' without file extension (mysound.mp3 -> mysound)
            sound: "blackberry",
    
            //Vibrate on new notification. Default value: true
            //Possible values:
            //Boolean - vibrate or not
            //Array - vibration pattern - e.g. [500, 200, 500] - milliseconds vibrate, milliseconds pause, vibrate, pause, etc.
            vibration: [300, 200, 300],
    
            // Whether to blink the LED
            light: true,
    
            //LED color in ARGB format - this example BLUE color. If set to -1, light color will be default. Default value: -1.
            lightColor: "0xFF0000FF",
    
            //Importance - integer from 0 to 4. Default value: 3
            //0 - none - no sound, does not show in the shade
            //1 - min - no sound, only shows in the shade, below the fold
            //2 - low - no sound, shows in the shade, and potentially in the status bar
            //3 - default - shows everywhere, makes noise, but does not visually intrude
            //4 - high - shows everywhere, makes noise and peeks
            importance: 4,
    
            //Show badge over app icon when non handled pushes are present. Default value: true
            badge: true,
    
            //Show message on locked screen. Default value: 1
            //Possible values (default 1):
            //-1 - secret - Do not reveal any part of the notification on a secure lockscreen.
            //0 - private - Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
            //1 - public - Show the notification in its entirety on all lockscreens.
            visibility: 1
        };
    
        FirebasePlugin.createChannel(customChannel,
            function() {
                console.log("Created custom channel: "+customChannel.id);
                FirebasePlugin.listChannels(
                    function(channels) {
                        if(typeof channels == "undefined") return;
                        for(var i=0;i<channels.length;i++) {
                            console.log("Channel id=" + channels[i].id + "; name=" + channels[i].name);
                        }
                    },
                    function(error) {
                        console.log('List channels error: ' + error);
                    }
                );
            },
            function(error) {
                console.log("Create channel error", error);
            }
        );
    },
    
    // Notifications
    checkNotificationPermission: function(requested){
        var _self = this;
        FirebasePlugin.hasPermission(function(hasPermission){
            if(hasPermission){
                console.log("Remote notifications permission granted");
                // Granted
                // _self.getToken();
                var getToken = function() {
                    FirebasePlugin.getToken(function(token){
                        console.log("Got FCM token: " + token)
                        userToken = token;
                    }, function(error) {
                        console.log("Failed to get FCM token", error);
                    });
                }
                getToken();
            }else if(!requested){
                // Request permission
                console.log("Requesting remote notifications permission");
                FirebasePlugin.grantPermission(_self.checkNotificationPermission.bind(this, true));
            }else{
                // Denied
                console.log("Notifications won't be shown as permission is denied");
            }
        });
    },

    getId: function() {
        FirebasePlugin.getId(function(id){
            console.log("Got FCM ID: " + id)
        }, function(error) {
            console.log("Failed to get FCM ID", error);
        });
    },
/*
    getToken: function() {
        FirebasePlugin.getToken(function(token){
            console.log("Got FCM token: " + token)
            userToken = token;
        }, function(error) {
            console.log("Failed to get FCM token", error);
        });
    },
*/
    getAPNSToken: function() {
        FirebasePlugin.getAPNSToken(function(token){
            console.log("Got APNS token: " + token)
        }, function(error) {
            console.log("Failed to get APNS token", error);
        });
    },

    handleNotificationMessage: function(message){
        if (message.title !== undefined && message.body !== undefined) {        // Android
            alert(message.title + ":\r\n" + message.body);
        } else if (message.aps.alert) {
            let _content = message.aps.alert;
            if (_content.title !== undefined && _content.body !== undefined) {  // iOS
                alert(_content.title + ":\r\n" + _content.body);
            }
        }
    },

    handleDataMessage: function(message){
    }
};

app.initialize();