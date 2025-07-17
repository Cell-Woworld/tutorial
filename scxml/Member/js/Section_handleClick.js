var Section_handleClick = function (item)
{
  if (!window.WsClient.proto_root_)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  function validateInAllFields(ELEM_PAIR, msgDialog) {
    let _check_result = true;
    ELEM_PAIR.every((element) => {
      if (!element.content) {
        let _content = JSON.parse(msgDialog.elem.content);
        _content["question"] = element.title;
        msgDialog.elem.content = JSON.stringify(_content);
        msgDialog.dialog = true;
        _check_result = false;
        return false;
      }
      return true;
    });
    return _check_result;
  }

  function collectAllValues(groupObj, valueList, keymap) {
    groupObj.elem.items.forEach(element => {
      switch (element.component) {
      case "GridSection": {
        let _itemList = {};
        element.items.forEach(element2 => {
          if (element2.component == 'v-checkbox') {
            if (groupObj.$refs[element.id][0].$refs[element2.id][0].modelValue)
              _itemList[element2.id] = true;
          }
          else {
            _itemList[element2.id] = groupObj.$refs[element.id][0].$refs[element2.id][0].modelValue;
          }
        },element);
        valueList.push({'key':keymap[element.id],'value':JSON.stringify(_itemList)});
        break;
      }
      case "v-text-field":
      case "v-textarea":
      case "v-select":
        valueList.push({'key':keymap[element.id],'value':groupObj.$refs[element.id][0].modelValue});
        break;
      case "v-checkbox":
        if (groupObj.$refs[element.id][0].modelValue)
          valueList.push({'key':keymap[element.id],'value':groupObj.$refs[element.id][0].modelValue});
        break;
      case "DatePicker":
        valueList.push({'key':keymap[element.id],'value':groupObj.$refs[element.id][0].value});
        break;
      default:
        break;
      }
    }, this);
  }
  
  function checkBoundary(valueList, BOUNDARY_MAP) {
    valueList.forEach((element,index) => {
      if (BOUNDARY_MAP[element.key] && BOUNDARY_MAP[element.key].length && element.value.length > BOUNDARY_MAP[element.key].length) {
        valueList[index].value = element.value.substr(0, BOUNDARY_MAP[element.key].length);
      }
    });
  }

  switch (item.id)
  {
    case "app_member_point_query": {
      let _startTime = new Date(this.$refs.app_member_point_date_picker_start[0].value.replace(/-/g, "/") + " 00:00:00");
      let _endTime = new Date(this.$refs.app_member_point_date_picker_end[0].value.replace(/-/g, "/") + " 23:59:59");
      if (_endTime < _startTime)
      {
        _content = JSON.parse(this.$root.$children[0].$refs.app_dialog_messagebox[0].elem.content);
        _content["question"] = "::Learning.Language[::Language][error_app_startTime_greater_than_endTime]";
        this.$root.$children[0].$refs.app_dialog_messagebox[0].elem.content = JSON.stringify(_content);
        this.$root.$children[0].$refs.app_dialog_messagebox[0].dialog = true;
        _check_result = false;
        return false;
      }
      let _ui_event =
      {
        startTime: _startTime.toISOString().substr(0, 19),
        endTime: _endTime.toISOString().substr(0, 19),
      };
      window.WsClient.PacketOut("Learning.Client.GetPointLog", _ui_event);
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
