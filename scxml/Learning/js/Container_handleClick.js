var Container_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  switch (item.id)
  {
  case 'app_home_delete': {
    let _ui_event =
    {
      id: item.id,
      content: this.$refs.app_home_gallery[0].elem.value,
    };
    window.WsClient.PacketOut("Generic.Client.Clicked", _ui_event);
    break;
  }
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
var Container_handleClick = Container_handleClick.bind(this);
Container_handleClick(item);
