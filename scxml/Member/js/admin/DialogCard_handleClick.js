var DialogCard_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  switch (item.id)
  {
  case "admin_member_create_confirm":
    {
      const ELEM_PAIR = [
        { content: this.$refs.admin_member_create_userName[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_userName]" },
        { content: this.$refs.admin_member_create_account[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_account]" },
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          _content = JSON.parse(this.$root.$children[0].$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$children[0].$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(
              _content);
          this.$root.$children[0].$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      });
      if (_check_result === false)
      {
        return;
      }
      _ui_event = {
        userName: this.$refs.admin_member_create_userName[0].modelValue,
        account: this.$refs.admin_member_create_account[0].modelValue,
        email: this.$refs.admin_member_create_account[0].modelValue,
        effectiveDate: this.$refs.admin_member_create_effectiveDate[0].value,
        expiredDate: this.$refs.admin_member_create_expiredDate[0].value,
        authority: this.$refs.admin_member_create_isAvailable[0].modelValue,
      };
      window.WsClient.PacketOut("Learning.Client.UpdateMember", _ui_event);
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
var DialogCard_handleClick = DialogCard_handleClick.bind(this);
DialogCard_handleClick(item);
