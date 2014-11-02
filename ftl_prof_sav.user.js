// ==UserScript==
// @name FTL prof.sav manager
// @namespace https://github.com/mivok/ftl-browser-prof-sav
// @version 0.1
// @author Mark Harrison
// @description Save/restore prof.sav in FTL browser version
// @include https://www.humblebundle.com/home
// @include https://www.humblebundle.com/home?*
// ==/UserScript==
//
// Copyright (c) 2014 Mark Harrison
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

function downloadProfile() {
    var req = indexedDB.open("CLOUDFS")
    req.onsuccess = function(e) {
        var db = e.target.result;
        var t = db.transaction("FILE_DATA");
        var os = t.objectStore("FILE_DATA");
        var dataReq = os.get("ftl_asm:prof.sav");
        dataReq.onsuccess = function(e) {
            var saveFile = new Blob([e.target.result.contents],
                    {type: 'application/octet-stream'});
            var url = window.URL.createObjectURL(saveFile);
            // Generate a link and click it
            var a = document.createElement('a');
            var e = document.createEvent('MouseEvents');
            a.download = 'prof.sav';
            a.href = url;
            a.dataset.downloadurl = ['application/octet-stream',
                a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false,
                    false, false, false, 0, null);
            a.dispatchEvent(e);
        }
        dataReq.onerror = function(e) {
            console.log("Error getting file");
        }
    }
    req.onerror = function(e) {
        console.log("Error accessing database");
    }
}

function uploadProfile() {
    var fi = document.getElementById("FtlProfSav");
    if (fi.files.length == 0) {
        alert("Please choose a prof.sav file to upload first");
    }
    var file = fi.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        // Get the prof.sav in the format we'll store it as
        var dataArray = new Uint8Array(this.result);
        // Generate an abject in the format the db needs
        var obj = {
            contents: dataArray,
            mode: 33206, // Copied from an existing entry
            path: "prof.sav",
            scope: "ftl_asm",
            timestamp: {}
        };
        // Actually put the prof.sav in the database
        var req = indexedDB.open("CLOUDFS");
        req.onsuccess = function(e) {
            var db = e.target.result;
            var t = db.transaction("FILE_DATA", "readwrite");
            var put = t.objectStore("FILE_DATA").put(obj, "ftl_asm:prof.sav");
            put.onsuccess = function(e) {
                alert("Successfully saved new prof.sav");
            }
        }

    }
    fileReader.readAsArrayBuffer(file);
}

function addButtons() {
    // Add download link
    var e = document.getElementsByClassName('base-main-wrapper')[0];
    var links = document.createElement('div');
    links.innerHTML = "<button id=\"FtlSave\">Save FTL prof.sav</button>" +
        "<button id=\"FtlRestore\">Restore FTL prof.sav</button>" +
        "<form>" +
        "<input type=\"file\" id=\"FtlProfSav\" name=\"FtlProfSav\">" +
        "</form>";
    e.insertBefore(links, e.firstChild);
    document.getElementById('FtlSave').addEventListener('click',
            downloadProfile, false);
    document.getElementById('FtlRestore').addEventListener('click',
            uploadProfile, false);
}

addButtons();
