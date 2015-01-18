#target bridge

// -----------------------------------------------------------------------------
// This script extends Adobe Bridge. It copies selected thumbnails' filenames 
// to their title fields. It is a simplified replacement for setfilenametotitle
// from www.DAMuseful.com. It does not require adobelibrary*. Tested with CS5.
// by B. Henne. Without warrenty. You may freely use and distribute it.
//
// Install: Just Copy this script to your Bridge's startup scripts folder.
// You can find that in Bridge -> Edit -> Preferences -> Startup scripts.
// -----------------------------------------------------------------------------

// Configure your script
stripFileExtension = true;  // true: save filename without extensio
                            // false: save filename with extension

/*
 @@@START_XML@@@
 <?xml version="1.0" encoding="UTF-8"?>
 <ScriptInfo xmlns:dc="http://purl.org/dc/elements/1.1/" xml:lang="en_US">
  <dc:title>Write Filename to IPTC Title Field</dc:title>
  <dc:description>This script enables the user to write filenames into the title field of metadata.</dc:description>
  <dc:source>https://github.com/bhenne/adobe-bridge-scripting</dc:source>
 </ScriptInfo>
 @@@END_XML@@@
*/

var menu = MenuElement.create("command", "Write Filename to IPTC Title Field",
                              "at the end of Tools");

menu.onSelect = function(m) {
    if (app.document.selectionLength == 0)
        return;
    var selectedThumbnails = app.document.getSelection();
    var modified = 0;
    for (var i = 0; i < selectedThumbnails.length; ++i) {
        var val = decodeURI(selectedThumbnails[i].name);
        if (stripFileExtension)
            val = val.replace(/\.[^\.]+$/, '');
        if (!selectedThumbnails[i].hasMetadata)
            continue;
        var metadata = selectedThumbnails[i].synchronousMetadata;
        metadata.namespace = 'http://ns.adobe.com/photoshop/1.0/';
        metadata.Title = val;
        modified++;
    }
    if (modified == i)
            alert('All files modified');
    else
        alert('Modified ' + modified +' of ' + i + ' files.');
}