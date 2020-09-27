import { createImageFileInput } from '@/utils/dom'

export default function initImageUploadPlugin() {
  window.tinymce.PluginManager.add('customerimageupload', editor => {
    commandRegister(editor)
    componentRegister(editor)
  })

  function commandRegister(editor) {
    editor.addCommand('mceCustomerImageUpload', () => {
      createImageFileInput().then(file => {
        // 选择文件后的上传回调，回调需要将 file 上传到服务器，返回 url 后调用 success(url)
        const cb = editor.settings.imageSelectorCallback
        cb && cb(file, success)
        function success(url) {
          editor.insertContent(`<img src="${url}" alt="加载失败" style="max-width: 100%;height: auto;" />`)
        }
      })
    })
  }

  function componentRegister(editor) {
    editor.ui.registry.addButton('customerimageupload', {
      icon: 'image',
      tooltip: '上传图片',
      onAction: () => {
        editor.execCommand('mceCustomerImageUpload')
      }
    })
  }
}
