// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/

const plugins = [
  'advlist',
  'anchor',
  'autolink',
  'autoresize',
  'autosave',
  'bbcode',
  'charmap',
  'code',
  'codesample',
  // 'colorpicker', now built in to the core editor
  // 'contextmenu', now built in to the core editor
  'directionality',
  'emoticons',
  'fullpage',
  'fullscreen',
  'help',
  'hr',
  'image',
  'imagetools',
  'importcss',
  'insertdatetime',
  'legacyoutput',
  'link',
  'lists',
  'media',
  'nonbreaking',
  'noneditable',
  'pagebreak',
  'paste',
  'preview',
  'print',
  'quickbars',
  'save',
  'searchreplace',
  'spellchecker',
  'tabfocus',
  'table',
  'template',
  // 'textcolor', now built in to the core editor
  'textpattern',
  'toc',
  'visualblocks',
  'visualchars',
  'wordcount',
  'customerimageupload',
  'ax_wordlimit'
].join(' ')

export default [plugins]
