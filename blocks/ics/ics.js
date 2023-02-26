import { readBlockConfig } from "../../scripts/scripts.js";

function loadScript(url, callback, type) {
    const $head = document.querySelector('head');
    const $script = document.createElement('script');
    $script.src = url;
    if (type) {
        $script.setAttribute('type', type);
    }
    $head.append($script);
    $script.onload = callback;
    return $script;
}

export default async function decorate(block) {

    const cfg = readBlockConfig(block);
    block.textContent = '';

    loadScript('/blocks/ics/ics.deps.min.js', () => {
        var cal = ics();
        cal.addEvent(cfg.subject, cfg.description, cfg.location, cfg.begin, cfg.end);
        var downloadBtn = document.createElement("button");
        downloadBtn.classList.add('btn-ics-download');
        const calIcon = document.createElement('img');
        calIcon.src = "/icons/calendar.svg";
        downloadBtn.appendChild(calIcon);
        const btnText = document.createElement('p');
        btnText.textContent = "Download ics";
        downloadBtn.appendChild(btnText);
        downloadBtn.addEventListener('click', () => {
            cal.download();
        });
        block.appendChild(downloadBtn);
    });
}