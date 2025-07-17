var Section_L2_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }
  
  switch (item.id)
  {
  case 'admin_member_modify':
  {
    let _ui_event = {
      id: item.id,
      content: this.$attrs.modelValue.userId,
    };
    window.WsClient.PacketOut(
      "Generic.Client.Clicked",
      _ui_event
    );
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
var Section_L2_handleClick = Section_L2_handleClick.bind(this);
Section_L2_handleClick(item);
