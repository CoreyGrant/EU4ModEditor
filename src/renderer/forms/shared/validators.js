
var thisExport = {
    euProp: (val) => /\s/g.test(val) ? 'Cannot contain any whitespace' : null,
    eu4Version: (val) => /^[1]{1}.[0-9]{1,2}.[0-9]{1,2}$/.test(val) ? null : 'Invalid version string' 
}
export default thisExport;