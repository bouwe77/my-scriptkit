// Name: Cheat Sheet
// Index: 0

import "@johnlindquist/kit";

let sheet = `
<pre>
;   = App Launcher
/   = File Browser
>   = Terminal
<   = Clipboard History
1-9 = Calculator
,   = Scratch Pad
.   = File Search
'   = Snippets
[   = Templates
"   = Word API
-   = System Commands
=   = Dev Tools
:   = Emoji Picker
~   = Google Suggest
\`   = Google
</pre>
`;

arg("", md(sheet));
