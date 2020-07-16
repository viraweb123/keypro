"use strict";

var srcMimeType = {
    "image/tiff": "tiff.png",
    "image/tif": "tiff.png",
    "image/x-tiff": "tiff.png",
    "image/x-tif": "tiff.png",
    "image/gif": "gif.png",
    "image/jpeg": "jpg.png",
    "image/pjpeg": "jpg.png",
    "image/png": "png.png",
    "image/bmp": "bmp.png",
    "image/x-windows-bmp": "bmp.png",
    "image/vnd.microsoft.icon": "ico.png",
    "image/psd": "psd.png",
    "application/acad": "dwg.png",
    "image/vnd.dwg": "dwg.png",
    "image/x-dwg": "dwg.png",
    "application/dxf": "dxf.png",
    "text/richtext": "rtf.png",
    "application/rtf": "rtf.png",
    "application/x-rtf": "rtf.png",
    "text/html": "html.png",
    "text/plain": "txt.png",
    "text/x-sql": "sql.png",
    "application/xml": "xml.png",
    "text/xml": "xml.png",
    "application/x-shockwave-flash": "swf.png",
    "video/x-flv": "flv.png",
    "application/pdf": "pdf.png",
    "application/vnd.android.package-archive": "",
    "audio/mpeg": "mp3.png",
    "audio/mpeg3": "mp3.png",
    "audio/x-mpeg-3": "mp3.png",
    "video/x-mpeg": "mpeg.png",
    "video/mp4": "mp4.png",
    "video/webm": "webm.png",
    "video/x-ms-wmv": "wmv.png",
    "video/avi": "avi.png",
    "application/x-troff-msvideo": "avi.png",
    "video/msvideo": "avi.png",
    "video/x-msvideo": "avi.png",
    "application/vnd.ms-excel": "xls.png",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx.png",
    "application/msword": "doc.png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx.png",
    "application/vnd.ms-powerpoint": "ppt.png",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx.png",
    "application/octet-stream": "none.png",
    "application/x-rar-compressed": "rar.png",
    "application/zip": "zip.png",
    "7z": "zip.png"
};
var getSrcFromType = function getSrcFromType(type) {
    if (_.has(srcMimeType, type)) return "/static/img/" + srcMimeType[type];
    return '/static/img/doci.png';
};