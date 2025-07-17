var DialogCard_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }
  

  function checkBoundary(valueList, BOUNDARY_MAP) {
    Object.entries(valueList).forEach(([key, value]) => {
      if (BOUNDARY_MAP[key]) {
        if (typeof value === 'string' && BOUNDARY_MAP[key].length && value.length > BOUNDARY_MAP[key].length) {
          valueList[key] = value.substr(0, BOUNDARY_MAP[key].length);
        }
        else if (typeof value === 'number') {
          if (value < BOUNDARY_MAP[key].min) {
            valueList[key] = BOUNDARY_MAP[key].min;
          } else if (value > BOUNDARY_MAP[key].max) {
            valueList[key] = BOUNDARY_MAP[key].max;
          }
        }
      }
    });
  }

  switch (item.id)
  {
  case "admin_create_new_account_confirm": {
    const ELEM_PAIR = [
      { content: this.$refs.new_account[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][admin_account_account]" },
      { content: this.$refs.admin_maintain_account_autority[0].modelValue, title: "::Learning.Language[::Language][please_select]::Learning.Language[::Language][admin_account_authority]" },
      { content: this.$refs.new_password1[0].modelValue && this.$refs.new_password1[0].modelValue==this.$refs.new_password2[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][the_same_password]" },
    ];
    let _check_result = true;
    ELEM_PAIR.every((element) =>
    {
      if (!element.content)
      {
        _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
        _content["question"] = element.title;
        this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(
            _content);
        this.$root.$refs.app_dialog_messagebox[0].dialog = true;
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
      account: this.$refs.new_account[0].$attrs.elem.value,
      password: this.$refs.new_password1[0].$attrs.elem.value,
      authority: this.$refs.admin_maintain_account_autority[0].$attrs.elem.value,
      deviceId: "",
    };

    const BOUNDARY_MAP = {
      'account': {length:15},
    };
    checkBoundary(_ui_event, BOUNDARY_MAP);

    window.WsClient.PacketOut("Account.Client.NewAccount", _ui_event);
    break;
  }
  case "admin_modify_account_confirm": {
    const ELEM_PAIR = [
      { content: this.$refs.admin_maintain_account_account[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][admin_account_account]" },
      { content: this.$refs.admin_maintain_account_autority[0].modelValue, title: "::Learning.Language[::Language][please_select]::Learning.Language[::Language][admin_account_authority]" },
    ];
    let _check_result = true;
    ELEM_PAIR.every((element) =>
    {
      if (!element.content)
      {
        _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
        _content["question"] = element.title;
        this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(
            _content);
        this.$root.$refs.app_dialog_messagebox[0].dialog = true;
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
      account: this.$refs.admin_maintain_account_account[0].$attrs.elem.value,
      authority: this.$refs.admin_maintain_account_autority[0].$attrs.elem.value,
    };

    const BOUNDARY_MAP = {
      'account': {length:15},
    };
    checkBoundary(_ui_event, BOUNDARY_MAP);

    window.WsClient.PacketOut("Account.Client.UpdateAccount", _ui_event);
    break;
  }
  case "admin_change_password_confirm": {
    const ELEM_PAIR = [
      { content: this.$refs.admin_change_password_password1[0].modelValue && this.$refs.admin_change_password_password1[0].modelValue==this.$refs.admin_change_password_password2[0].modelValue, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][the_same_password]" },
    ];
    let _check_result = true;
    ELEM_PAIR.every((element) =>
    {
      if (!element.content)
      {
        _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
        _content["question"] = element.title;
        this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(
            _content);
        this.$root.$refs.app_dialog_messagebox[0].dialog = true;
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
      password: this.$refs.admin_change_password_password1[0].modelValue,
    };
    window.WsClient.PacketOut("Account.Client.UpdatePassword", _ui_event);
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
