var Section_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }
  switch (item.id)
  {
  case "admin_member_query":
    {
      let _ui_event =
      {
        account: this.$refs.admin_member_account[0].modelValue,
        userName: this.$refs.admin_member_userName[0].modelValue,
      };
      window.WsClient.PacketOut("Learning.Client.GetMemberList", _ui_event);
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
var Section_handleClick = Section_handleClick.bind(this);
Section_handleClick(item);
