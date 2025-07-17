var GridSection_handleChanged = function (item)
{
  if (window.WsClient.proto_root_ === undefined) {
    window.console.log("protobuf is not ready");
    return;
  }
  switch(this.elem.id.slice(0,-1))
  {
  case 'app_modify_account_expertise_list': {
    this.itemList_[item.id] = item.value;
    break;
  }
  default:
    break;
  }
};
var GridSection_handleChanged = GridSection_handleChanged.bind(this);
GridSection_handleChanged(item);
