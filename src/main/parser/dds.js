var triangle = require('a-big-triangle')
var Texture = require('glo-texture/2d')
var Shader = require('glo-shader')
const { createCanvas, loadImage } = require('canvas')
var fs = require('fs')
var path = require('path')

export default function convert(buf){
    var opt = {output: 'jpg'};
    var data = toArrayBuffer(buf)
    try {
      return run(parseDDS(data), data, opt)
    } catch (e) {
    }
}
    
function run (dds, array, opt) {
    console.log('Size', dds.shape.join('x'))
    console.log('Format', dds.format)
  
    ipc.send('parse', { shape: dds.shape, format: dds.format })
  
    var canvas
    if (dds.cubemap) {
      canvas = renderCubemap(dds, array, opt)
    } else {
      canvas = renderCompressed(dds, array, opt)
    }
    var output = opt.output
    if (output) {
      if (/(jpeg|jpg)/i.test(output)) {
        output = 'image/jpg'
      } else {
        output = 'image/jpg'
      }
    }
    var buffer = canvas.createPNGStream();
    return buffer;
}

function renderCompressed (dds, array, opt) {
    opt = opt || {}
    var level = opt.level || 0
  
    var vert = fs.readFileSync(path.join(__dirname, 'shader', 'vert.glsl'))
    var frag = fs.readFileSync(path.join(__dirname, 'shader', 'frag.glsl'))
  
    if (level >= dds.images.length) {
      throw new Error('level must be less than mip map level ' + dds.images.length)
    }
    var image = dds.images[level]
    var shape = opt.stretch ? dds.shape : image.shape
    var gl = getCanvasContext('webgl', {
      alpha: true,
      preserveDrawingBuffer: true,
      width: shape[0],
      height: shape[1],
      canvas: createCanvas(200, 200)
    })
  
    var ext = gl.getExtension('WEBGL_compressed_texture_s3tc')
    if (!ext) {
      throw new Error('compressed texture rendering not supported on this GPU')
    }
  
    var shader = Shader(gl, { vertex: vert, fragment: frag })
  
    var texture = Texture(gl)
    texture.magFilter = gl.LINEAR
    texture.compressed = true
    texture.format = getFormat(ext, dds.format)
  
    var subArray = new Uint8Array(array, image.offset, image.length)
    texture.update(subArray, image.shape, 0)
  
    var canvas = gl.canvas
    render()
  
    texture.dispose()
    shader.dispose()
    gl = null
    return canvas
  
    function render () {
      shader.bind()
      shader.uniforms.iChannel0(0)
      texture.bind()
      triangle(gl)
    }
  }
  
  function getFormat (ext, ddsFormat) {
    switch (ddsFormat) {
      case 'dxt1':
        return ext.COMPRESSED_RGB_S3TC_DXT1_EXT
      case 'dxt3':
        return ext.COMPRESSED_RGBA_S3TC_DXT3_EXT
      case 'dxt5':
        return ext.COMPRESSED_RGBA_S3TC_DXT5_EXT
      default:
        throw new Error('unsupported format ' + ddsFormat)
    }
  }
  function getCanvasContext (type, opts) {
    if (typeof type !== 'string') {
      throw new TypeError('must specify type string')
    }
  
    opts = opts || {}
  
    if (typeof document === 'undefined' && !opts.canvas) {
      return null // check for Node
    }
  
    var canvas = opts.canvas || document.createElement('canvas')
    if (typeof opts.width === 'number') {
      canvas.width = opts.width
    }
    if (typeof opts.height === 'number') {
      canvas.height = opts.height
    }
  
    var attribs = opts
    var gl
    try {
      var names = [ type ]
      // prefix GL contexts
      if (type.indexOf('webgl') === 0) {
        names.push('experimental-' + type)
      }
  
      for (var i = 0; i < names.length; i++) {
        gl = canvas.getContext(names[i], attribs)
        if (gl) return gl
      }
    } catch (e) {
      gl = null
    }
    return (gl || null) // ensure null on fail
  }