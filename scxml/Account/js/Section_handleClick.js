var Section_handleClick = function (item)
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
  case "app_registration_commit": {
      const ELEM_PAIR = [
        { content: this.$parent.$refs.app_registration_userName[0].$attrs.elem.value, title: "::Learning.Language[::Language][please_input]::Learning.Language[::Language][title_userName]" },
        { content: this.$parent.$refs.app_registration_account[0].$attrs.elem.value, title: "::Learning.Language[::Language][err_register_input_account]" },
        { content: this.$parent.$refs.app_registration_password1[0].$attrs.elem.value && this.$parent.$refs.app_registration_password1[0].$attrs.elem.value === this.$parent.$refs.app_registration_password2[0].$attrs.elem.value, title:"::Learning.Language[::Language][please_input]::Learning.Language[::Language][the_same_password]"},
      ];
      let _check_result = true;
      ELEM_PAIR.every((element) =>
      {
        if (!element.content)
        {
          _content = JSON.parse(this.$root.$refs.app_dialog_messagebox[0].elem.content);
          _content["question"] = element.title;
          this.$root.$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
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
        userName: this.$parent.$refs.app_registration_userName[0].$attrs.elem.value,
        account: this.$parent.$refs.app_registration_account[0].$attrs.elem.value,
        password: this.$parent.$refs.app_registration_password1[0].$attrs.elem.value,
        email: this.$parent.$refs.app_registration_account[0].$attrs.elem.value,
        deviceId: window.deviceId,
      };
      window.WsClient.PacketOut("Account.Client.NewAccount", _ui_event);
      break;
    }
  case "show_version_icon":
  case "show_version_label":
  case "show_version": {
    const UUID_RULE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    Object.entries(this.$root.$refs).forEach(([key, value]) => {
      if (key.match(UUID_RULE) && value.length > 0 && value[0].$refs.app_version_info[0].elem.content !== "" && window.cordova !== undefined) {
        let _target = value[0].$refs.app_version_info[0];
        window.cordova.getAppVersion.getAppName().then(function (appName)
        {
          // My App Name
          //console.log("App Name", appName);
          var _appName = appName;
          window.cordova.getAppVersion
          .getVersionNumber()
          .then(function (versionNumber)
          {
            // 1.0.0
            //window.console.log("version number", versionNumber);
            var _dialog_content = JSON.parse(_target.elem.content);
            _dialog_content.question = _appName + " v." + versionNumber; //navigator.appVersion;
            _target.elem.content = JSON.stringify(_dialog_content);
            _target.dialog = true;
          }
          );
        },this);
      }
    },this);
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
