var Section_handleChanged = function (item)
{
  if (window.WsClient.proto_root_ === undefined)
  {
    window.console.log("protobuf is not ready");
    return;
  }

  const [_item,_event]=item;
  switch (_item.id)
  {
  case "app_trafficLight_pick_file":
    {
      let _ui_event =
      {
        fileList: [],
      };
      let _total_file_count = event.target.files.length;
      [...event.target.files].forEach(file => {
        if (file.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.addEventListener("load", () => {
          _ui_event.fileList.push(
          {
            type: file.name.split(".").slice(-1)[0],
            data: new Uint8Array(fr.result),
          }
          );
          window.console.log("content size=" + fr.result.byteLength);
          if (_ui_event.fileList.length === _total_file_count)
          {
            window.WsClient.PacketOut("Learning.Client.UploadFiles",_ui_event);
            _ui_event = null;
          }
        });
      });
      break;
    }
  default:
    break;
  }
};
var Section_handleChanged = Section_handleChanged.bind(this);
Section_handleChanged(item);
