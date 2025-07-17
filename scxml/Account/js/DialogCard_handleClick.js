var DialogCard_handleClick = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  switch (item.id)
  {
  case "app_user_login":
    {
      const ELEM_PAIR = [
        {
          content: this.$refs.app_user_login_account[0].$attrs.elem.value,
          title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_account]"
        },
        {
          content: this.$refs.app_user_login_password[0].$attrs.elem.value,
          title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_password]"
        },
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          let _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
          this.$root.$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      }
      );
      if (_check_result === false)
      {
        return;
      }

      let _ui_event =
      {
        account: this.$refs.app_user_login_account[0].$attrs.elem.value,
        password: this.$refs.app_user_login_password[0].$attrs.elem.value,
        deviceId: window.deviceId,
        userToken: window.userToken,
        host: window.location.protocol + "//" + window.location.host,
        loginType: this.$root.params.get('admin')?'admin':'',
        autoLogin: this.$refs.app_user_autologin[0].$attrs.elem.value,
      };

      window.WsClient.PacketOut("Generic.Client.Login", _ui_event);
      break;
    }
  case "app_admin_login":
    {
      const ELEM_PAIR = [
        {
          target: this.$refs.app_user_login_account[0].$attrs.elem.value,
          title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_account]"
        },
        {
          target: this.$refs.app_user_login_password[0].$attrs.elem.value,
          title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_password]"
        },
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.target)
        {
          let _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["content"] = element.content;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
          this.$root.$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      }
      );
      if (_check_result === false)
      {
        return;
      }

      let _ui_event =
      {
        account: this.$refs.app_user_login_account[0].$attrs.elem.value,
        password: this.$refs.app_user_login_password[0].$attrs.elem.value,
        deviceId: window.deviceId,
        userToken: window.userToken,
        host: window.location.protocol + "//" + window.location.host,
        loginType: this.$root.params.get('admin')?'admin':'',
        autoLogin: false,
      };

      window.WsClient.PacketOut("Generic.Client.Login", _ui_event);
      break;
    }
  case "app_reset_password_confirm":
    {
      const ELEM_PAIR = [
        { content: this.$refs.app_reset_password_account[0].$attrs.elem.value, title: "::Learning.Language[::Language][err_register_input_account]" },
        { content: this.$refs.app_reset_password_password1[0].$attrs.elem.value && this.$refs.app_reset_password_password1[0].$attrs.elem.value === this.$refs.app_reset_password_password2[0].$attrs.elem.value, title:"::Learning.Language[::Language][please_input]::Learning.Language[::Language][the_same_password]"},
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          let _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
          this.$root.$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      }
      );
      if (_check_result === false)
      {
        return;
      }

      let _ui_event =
      {
        account: this.$refs.app_reset_password_account[0].$attrs.elem.value,
        password: this.$refs.app_reset_password_password1[0].$attrs.elem.value,
      };

      window.WsClient.PacketOut("Account.Client.ResetPassword", _ui_event);
      break;
    }
  case "app_modify_account_cancel":
  case "app_change_password_cancel":
    {
      this.$root.$refs.app_dialog_messagebox[0].elem.items = [];
      this.$root.$refs.app_dialog_messagebox[0].dialog = false;
      let _ui_event =
      {
        id: item.id,
      };
      window.WsClient.PacketOut("Generic.Client.Clicked", _ui_event);
      break;
    }
  case "app_modify_account_confirm":
    {
      const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const ELEM_PAIR = [
        { content: this.$refs.app_modify_account_account[0].$attrs.elem.value && this.$refs.app_modify_account_account[0].$attrs.elem.value.match(EMAIL_PATTERN), title: "::Learning.Language[::Language][err_register_input_account]" },
      ]
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          let _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
          this.$root.$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      }
      );
      if (_check_result === false)
      {
        return;
      }

      let _ui_event =
      {
        account: this.refs.app_modify_account_account[0].$attrs.elem.value,
      };

      window.WsClient.PacketOut("Account.Client.UpdateAccount", _ui_event);
      break;
    }
  case "app_change_password_confirm":
    {
      const ELEM_PAIR = [
        { content: this.$refs.app_change_password_password1[0].$attrs.elem.value && this.$refs.app_change_password_password1[0].$attrs.elem.value === this.$refs.app_change_password_password2[0].$attrs.elem.value, title:"::Learning.Language[::Language][please_input]::Learning.Language[::Language][the_same_password]"},
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          let _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
          this.$root.$refs.app_dialog_messagebox[0].dialog = true;
          _check_result = false;
          return false;
        }
        return true;
      }
      );
      if (_check_result === false)
      {
        return;
      }

      let _ui_event =
      {
        password: this.$refs.app_change_password_password1[0].$attrs.elem.value,
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
