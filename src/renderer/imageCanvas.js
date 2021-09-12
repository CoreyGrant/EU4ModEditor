var Texture = require('glo-texture/2d')
var Shader = require('glo-shader')

const frag = `precision mediump float;

varying vec2 vUv;
uniform sampler2D iChannel0;

void main() {
  gl_FragColor = texture2D(iChannel0, vUv);
}`;
    const vert = `attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = (position + 1.0) * 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(position, 1.0, 1.0);
}`;

function getFormat (ext, ddsFormat) {
    switch (ddsFormat) {
      case 'dxt1':
        return ext.COMPRESSED_RGB_S3TC_DXT1_EXT
      case 'dxt3':
        return ext.COMPRESSED_RGBA_S3TC_DXT3_EXT
      case 'dxt5':
        return ext.COMPRESSED_RGBA_S3TC_DXT5_EXT
      default:
        //throw new Error('unsupported format ' + ddsFormat)
    }
  }

var isArrayBufferSupported = (Buffer.alloc(0)).buffer instanceof ArrayBuffer;

var bufferToArrayBuffer = isArrayBufferSupported ? bufferToArrayBufferSlice : bufferToArrayBufferCycle;

function bufferToArrayBufferSlice(buffer) {
return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

function bufferToArrayBufferCycle(buffer) {
var ab = new ArrayBuffer(buffer.length);
var view = new Uint8Array(ab);
for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
}
return ab;
}

export function displayImageCanvasDds(canvas, b64array){
    var array = bufferToArrayBuffer(Buffer.from(b64array, "base64"));
    var level = 0;
    var dds = parseHeaders(array);
    var image = dds.images[level]
    const gl = canvas.getContext("webgl");
    var shader = Shader(gl, { vertex: vert, fragment: frag })
    var ext = gl.getExtension('WEBGL_compressed_texture_s3tc')
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var subArray = new Uint8Array(array, image.offset, image.length);
    gl.texImage2D(gl.TEXTURE_2D, level, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, subArray);
    //gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    texture.update(subArray, image.shape, 0)
    shader.bind();
    //shader.uniforms.iChannel0(0);
    texture.bind();
    //texture.dispose()
    //shader.dispose()
}

// All values and structures referenced from:
// http://msdn.microsoft.com/en-us/library/bb943991.aspx/
//
// DX10 Cubemap support based on
// https://github.com/dariomanesku/cmft/issues/7#issuecomment-69516844
// https://msdn.microsoft.com/en-us/library/windows/desktop/bb943983(v=vs.85).aspx
// https://github.com/playcanvas/engine/blob/master/src/resources/resources_texture.js

var DDS_MAGIC = 0x20534444
var DDSD_MIPMAPCOUNT = 0x20000
var DDPF_FOURCC = 0x4

var FOURCC_DXT1 = fourCCToInt32('DXT1')
var FOURCC_DXT3 = fourCCToInt32('DXT3')
var FOURCC_DXT5 = fourCCToInt32('DXT5')
var FOURCC_DX10 = fourCCToInt32('DX10')
var FOURCC_FP32F = 116 // DXGI_FORMAT_R32G32B32A32_FLOAT

var DDSCAPS2_CUBEMAP = 0x200
var D3D10_RESOURCE_DIMENSION_TEXTURE2D = 3
var DXGI_FORMAT_R32G32B32A32_FLOAT = 2

// The header length in 32 bit ints
var headerLengthInt = 31

// Offsets into the header array
var off_magic = 0
var off_size = 1
var off_flags = 2
var off_height = 3
var off_width = 4
var off_mipmapCount = 7
var off_pfFlags = 20
var off_pfFourCC = 21
var off_caps2 = 28

function parseHeaders (arrayBuffer) {
  var header = new Int32Array(arrayBuffer, 0, headerLengthInt)
    console.log(header);
  if (header[off_magic] !== DDS_MAGIC) {
    throw new Error('Invalid magic number in DDS header')
  }

  if (!header[off_pfFlags] & DDPF_FOURCC) {
    throw new Error('Unsupported format, must contain a FourCC code')
  }

  var blockBytes
  var format
  var fourCC = header[off_pfFourCC]
  switch (fourCC) {
    case FOURCC_DXT1:
      blockBytes = 8
      format = 'dxt1'
      break
    case FOURCC_DXT3:
      blockBytes = 16
      format = 'dxt3'
      break
    case FOURCC_DXT5:
      blockBytes = 16
      format = 'dxt5'
      break
    case FOURCC_FP32F:
      format = 'rgba32f'
      break
    case FOURCC_DX10:
      var dx10Header = new Uint32Array(arrayBuffer.slice(128, 128 + 20))
      format = dx10Header[0]
      var resourceDimension = dx10Header[1]
      var miscFlag = dx10Header[2]
      var arraySize = dx10Header[3]
      var miscFlags2 = dx10Header[4]

      if (resourceDimension === D3D10_RESOURCE_DIMENSION_TEXTURE2D && format === DXGI_FORMAT_R32G32B32A32_FLOAT) {
        format = 'rgba32f'
      } else {
        throw new Error('Unsupported DX10 texture format ' + format)
      }
      break
    default:
      //throw new Error('Unsupported FourCC code: ' + int32ToFourCC(fourCC))
  }

  var flags = header[off_flags]
  var mipmapCount = 1

  if (flags & DDSD_MIPMAPCOUNT) {
    mipmapCount = Math.max(1, header[off_mipmapCount])
  }

  var cubemap = false
  var caps2 = header[off_caps2]
  if (caps2 & DDSCAPS2_CUBEMAP) {
    cubemap = true
  }

  var width = header[off_width]
  var height = header[off_height]
  var dataOffset = header[off_size] + 4
  var texWidth = width
  var texHeight = height
  var images = []
  var dataLength

  if (fourCC === FOURCC_DX10) {
    dataOffset += 20
  }

  if (cubemap) {
    for (var f = 0; f < 6; f++) {
      if (format !== 'rgba32f') {
        throw new Error('Only RGBA32f cubemaps are supported')
      }
      var bpp = 4 * 32 / 8

      width = texWidth
      height = texHeight

      // cubemap should have all mipmap levels defined
      // Math.log2(width) + 1
      var requiredMipLevels = Math.log(width) / Math.log(2) + 1

      for (var i = 0; i < requiredMipLevels; i++) {
        dataLength = width * height * bpp
        images.push({
          offset: dataOffset,
          length: dataLength,
          shape: [ width, height ]
        })
        // Reuse data from the previous level if we are beyond mipmapCount
        // This is hack for CMFT not publishing full mipmap chain https://github.com/dariomanesku/cmft/issues/10
        if (i < mipmapCount) {
          dataOffset += dataLength
        }
        width = Math.floor(width / 2)
        height = Math.floor(height / 2)
      }
    }
  } else {
    for (var i = 0; i < mipmapCount; i++) {
      dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes

      images.push({
        offset: dataOffset,
        length: dataLength,
        shape: [ width, height ]
      })
      dataOffset += dataLength
      width = Math.floor(width / 2)
      height = Math.floor(height / 2)
    }
  }

  return {
    shape: [ texWidth, texHeight ],
    images: images,
    format: format,
    flags: flags,
    cubemap: cubemap
  }
}

function fourCCToInt32 (value) {
  return value.charCodeAt(0) +
    (value.charCodeAt(1) << 8) +
    (value.charCodeAt(2) << 16) +
    (value.charCodeAt(3) << 24)
}

function int32ToFourCC (value) {
  return String.fromCharCode(
    value & 0xff,
    (value >> 8) & 0xff,
    (value >> 16) & 0xff,
    (value >> 24) & 0xff
  )
}
