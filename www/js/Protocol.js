/* Websocket Configuration */
function Protocol() {
  /*Initializing the connection with the server via websockets */
  //var connectSocket = function()
  function handleError(error) {
    alert(error);
  }

  function GenericMessageHandler(name, object) {
    switch (name) {
      case 'Web.AddProto': {
        var _parse_result = protobuf.parse(new TextDecoder("utf-8").decode(object.content), WsClient.proto_root_);
        console.log('add proto of Package: ' + _parse_result.package);
        break;
      }
      case 'Web.AddJS':
        //$('#script_section').append(object.content);
        //$('#view').append('<script type="text/javascript">' + object.content + '</script>');
        break;
      case 'Web.RunJS':
        eval(new TextDecoder("utf-8").decode(object.content));
        break;
      default:
        break;
    }
  }

  function init_web_proto() {
    protobuf.load("proto/Web.proto", function (err, root) {
      if (err) throw err;
      console.log('Web.proto is loaded');

      WsClient.proto_root_ = root;
      WsClient.WebEventProto = WsClient.proto_root_.lookupType("Web.WebEvent");
      // if (WsClient.socket === undefined || WsClient.socket === null) {
      // 	WsClient.connectSocket();
      // }
    })
  }

  if (typeof protobuf !== 'undefined' && protobuf !== null) {
    init_web_proto();
  }
  else {
    var _interval_id = setInterval(() => {
      if (typeof protobuf !== 'undefined' && protobuf !== null) {
        clearInterval(_interval_id);
        init_web_proto();
      }
    }, 100);
  }
  this.addPacketInHandler(GenericMessageHandler);
}

Protocol.prototype.socket = null;
Protocol.prototype.WebEventProto = null;
Protocol.prototype.proto_root_ = null
Protocol.prototype.url = null
Protocol.prototype.onPacketIn = [];
Protocol.prototype.customized_proto = [];

Protocol.prototype.addPacketInHandler = function (Handler) {
  this.onPacketIn.push(Handler);
}

Protocol.prototype.ParseFromByteArray = function (uint8array) {
  var in_packet = WsClient.WebEventProto.decode(uint8array);
  console.log("* packet received : " + in_packet.name);
  var _packet_instance = WsClient.proto_root_.lookupType(in_packet.name).decode(in_packet.payload);
  WsClient.onPacketIn.forEach(Handler => {
    Handler(in_packet.name, _packet_instance);
  });
}


Protocol.prototype.PacketOut = function (name, msg) {
  var CommandProto = WsClient.proto_root_.lookupType(name);
  var message = this.WebEventProto.create();
  message.name = name;
  message.payload = CommandProto.encode(CommandProto.fromObject(msg)).finish();
  //var msg_str = JSON.stringify(msg);
  // var msg_str = JSON.stringify(msg, null, 4); // (Optional) beautiful indented output.
  // console.log('message: ' + name + ', data: '+ msg_str + ', payload: ' + message.payload);

  if (WsClient.socket !== undefined && WsClient.socket !== null && WsClient.socket.readyState === WebSocket.OPEN) {
    var buffer = this.WebEventProto.encode(message).finish();
    // console.log('encoded: ' + buffer);
    /*
    var messageDec = WebCommand.decode(buffer);
    var content = CommandProto.decode(messageDec.content);
    var object = CommandProto.toObject(content, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
    console.log(object);
    */
    WsClient.socket.send(buffer);
  }
  else if (CellJS !== null && CellJS.available === true) {
    CellJS.sendEvent(message.name, message.payload);
  }
};

Protocol.prototype.connectSocket = function (url) {
  if (!url)
    return;
  console.log('Initializing socket');
  if (window.hasOwnProperty("WebSocket")) { // webkit-browser
    WsClient.socket = new WebSocket("ws://" + url);
  } else if (window.hasOwnProperty("MozWebSocket")) { // firefox
    WsClient.socket = new MozWebSocket("ws://" + url);
  } else { // browser doesnt support websocket
    handleError("Your browser doesn't support WebSocket.");
  }
  WsClient.url = url;
  WsClient.socket.onopen = function () {
    console.log('Socket is ready.');
  };

  WsClient.socket.onmessage = function (message) {
    /*
        When server sends data to the client it will trigger "message" event on the client side , by
        using socket.on("message") , one cna listen for the ,message event and associate a callback to
        be executed . The Callback function gets the dat sent from the server
    */
    var uint8array;
    var fileReader = new FileReader();
    fileReader.onload = function (progressEvent) {
      uint8array = new Uint8Array(this.result);
      //console.log(uint8array);
      WsClient.ParseFromByteArray(uint8array);
    };
    fileReader.readAsArrayBuffer(message.data);
  }

  WsClient.socket.onclose = function (message) {
    let sleep= (time)=> new Promise((resolve)=>{
      setTimeout(resolve,time)
    })
    sleep(5000).then(() => {
      if (WsClient.socket.readyState !== WsClient.socket.OPEN) {
        if (WsClient.url)
          WsClient.connectSocket(WsClient.url);
      } else {
        console.log("Connect successfully");
      }
    });
  }
}

var WsClient = new Protocol();
var CellJS = null;
if (deviceId === undefined)
  deviceId = null;