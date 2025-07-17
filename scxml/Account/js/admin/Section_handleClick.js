var Section_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }
  switch (item.id)
  {
  case "admin_maintain_account_update": 
  {
    let _ui_event = {
      accountList: [],
    };
    Object.entries(
      this.$parent.$refs.account_list[0].itemList_
    ).forEach(([key, value]) => {
      _ui_event.accountList.push({
        userId: key,
        account: value.account,
        authority: value.authority,
      });
    });
    if (_ui_event.accountList.length > 0) {
      window.WsClient.PacketOut(
        "Account.Client.UpdateAccountList",
        _ui_event
      );
    }
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
