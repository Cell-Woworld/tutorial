var Section_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  switch (item.id)
  {
  case "app_trafficLight_download": {
    let _exportContent = '::Learning.TrafficLightView.normal';
    if (_exportContent.length > 0) {
      var encodedUri = encodeURI(_exportContent);
      var link = document.createElement("a");
      link.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodedUri);
      link.setAttribute("download", "TrafficLight.scxml");
      document.body.appendChild(link); 
      link.click();
    }
    break;
  }
  case "app_trafficLight_download_reversed": {
    let _exportContent = '::Learning.TrafficLightView.reversed';
    if (_exportContent.length > 0) {
      var encodedUri = encodeURI(_exportContent);
      var link = document.createElement("a");
      link.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodedUri);
      link.setAttribute("download", "TrafficLight_reversed.scxml");
      document.body.appendChild(link); 
      link.click();
    }
    break;
  }
  case "app_trafficLight_upload":
    this.$refs.app_trafficLight_pick_file[0].click();
    break;
  default:
    {
      let _ui_event =
      {
        id: item.id,
      };
      window.WsClient.PacketOut("Generic.Client.Clicked", _ui_event);
      break;
    }
  }
};
var Section_handleClick = Section_handleClick.bind(this);
Section_handleClick(item);
