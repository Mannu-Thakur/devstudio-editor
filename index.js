let editors = {};
let current = "html";
let monacoEditor;

// ===== MONACO CONFIG =====
require.config({
    paths: {
        vs: "https://unpkg.com/monaco-editor@latest/min/vs"
    }
});

// FIX: Worker issue
window.MonacoEnvironment = {
    getWorkerUrl: function () {
        return `data:text/javascript;charset=utf-8,
        self.MonacoEnvironment = {
            baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');`;
    }
};

// ===== INIT EDITOR =====
require(["vs/editor/editor.main"], function () {

    editors = {
        html: "<h1>Hello World</h1>",
        css: "h1 { color: red; }",
        js: "console.log('Working');"
    };

    monacoEditor = monaco.editor.create(document.getElementById("editor"), {
        value: editors.html,
        language: "html",
        theme: "vs-dark",
        automaticLayout: true
    });

});

// ===== SWITCH TAB =====
function switchTab(type){
    saveCurrent();

    current = type;

    const languageMap = {
        html: "html",
        css: "css",
        js: "javascript"
    };

    monaco.editor.setModelLanguage(
        monacoEditor.getModel(),
        languageMap[type]
    );

    monacoEditor.setValue(editors[type]);

    document.querySelectorAll('.tab').forEach(tab=>tab.classList.remove('active'));
    event.target.classList.add('active');
}

// ===== SAVE CURRENT =====
function saveCurrent(){
    if(monacoEditor){
        editors[current] = monacoEditor.getValue();
    }
}

// ===== RUN CODE =====
function run(){
    saveCurrent();

    const code = `
    <html>
    <head>
        <style>${editors.css}</style>
    </head>
    <body>
        ${editors.html}

        <script>
            const log = (...args)=>{
                parent.postMessage({type:'log', data: args.join(" ")}, '*');
            };

            const error = (...args)=>{
                parent.postMessage({type:'error', data: args.join(" ")}, '*');
            };

            console.log = log;
            console.error = error;

            try{
                ${editors.js}
            }catch(e){
                error(e.message);
            }
        <\/script>
    </body>
    </html>
    `;

    document.getElementById("output").srcdoc = code;
}

// ===== CONSOLE =====
window.addEventListener("message", (e)=>{
    const consoleDiv = document.getElementById("console");

    if(e.data.type === "log"){
        consoleDiv.innerHTML += `<p>${e.data.data}</p>`;
    }

    if(e.data.type === "error"){
        consoleDiv.innerHTML += `<p style="color:red;">Error: ${e.data.data}</p>`;
    }
});

// ===== CLEAR CONSOLE =====
function clearConsole(){
    document.getElementById("console").innerHTML = "";
}

// ===== RESIZER =====
const resizer = document.getElementById("resizer");
const left = document.querySelector(".left");

let isDragging = false;

resizer.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mousemove", (e) => {
    if(!isDragging) return;

    left.style.width = e.clientX + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});


function downloadProject(){
    saveCurrent();

    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exported Project</title>
<style>
${editors.css}
</style>
</head>
<body>

${editors.html}

<script>
${editors.js}
<\/script>

</body>
</html>
`;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "project.html";
    a.click();

    URL.revokeObjectURL(url);
}

async function downloadZIP(){
    saveCurrent();

    const zip = new JSZip();

    zip.file("index.html", `
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>
${editors.html}
<script src="script.js"><\/script>
</body>
</html>
    `);

    zip.file("style.css", editors.css);
    zip.file("script.js", editors.js);

    const content = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "project.zip";
    a.click();
}


// SHARE---------------
async function shareProject(){
    saveCurrent();

    const res = await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editors)
    });

    const data = await res.json();

   const url = `${window.location.origin}?id=${data.id}`;

    navigator.clipboard.writeText(url);
    alert("Link copied: " + url);
}


// LOAD ----
window.onload = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(id){
        const res = await fetch(`http://localhost:3000/project/${id}`);
        const data = await res.json();

        editors = data;

        if(monacoEditor){
            monacoEditor.setValue(editors.html);
        }
    }
};