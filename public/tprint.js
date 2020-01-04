
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
class P {
    constructor(config, ifr) {
        this.config = config;
        this.ifr = ifr;
        this.ifr.cloneToIframe();
        this.print();
    }
    checkIdIsEmpty(e) {
        if (!e)
            console.error("id 不能为空");
    }
    print() {
        this.ifr.print();
    }
}

class Iframe {
    constructor(config) {
        this.config = config;
        this.iframe = this.createIframe();
        this.printPage = document.getElementById(this.config.id);
    }
    createIframe() {
        const checkIframe = document.getElementById(this.config.frameId);
        if (!checkIframe) {
            let printFrame = document.createElement("iframe");
            printFrame.setAttribute("style", "visibility: hidden; height: 0; width: 0; position: absolute;");
            printFrame.setAttribute("id", this.config.frameId);
            printFrame.setAttribute("name", this.config.frameId);
            // printFrame.srcdoc = `<html><head><title>${this.config.title}</title></head><body></body></html>`;
            document.getElementsByTagName("body")[0].appendChild(printFrame);
            return document.getElementById(this.config.frameId);
        }
        return checkIframe;
    }
    cloneToIframe() {
        console.log(this.printPage);
        if (this.printPage)
            this.traverseNode(this.printPage, (ele) => {
                ele.setAttribute("p-style", window.getComputedStyle(ele, null).cssText);
            });
        if (this.config.frameId) {
            // let printFrameObj= document.getElementById(this.config.frameId).contentWindow;
            const printFrameObj = this.iframe.contentWindow;
            if (printFrameObj) {
                const iframeBody = printFrameObj.document.getElementsByTagName("body")[0];
                if (this.printPage && iframeBody && printFrameObj) {
                    iframeBody.innerHTML = "";
                    iframeBody.appendChild(this.printPage.cloneNode(true));
                }
            }
        }
        this.removeTempStyle();
    }
    // private cloneEle() {
    //   // this.printPage.
    // }
    removeTempStyle() {
        if (this.printPage)
            this.traverseNode(this.printPage, (ele) => {
                ele.removeAttribute("p-style");
            });
        if (this.iframe.contentWindow) {
            const iframePageEle = this.iframe.contentWindow.document.getElementById(this.config.id);
            iframePageEle && this.traverseNode(iframePageEle, (ele) => {
                const pStyle = ele.getAttribute("p-style");
                pStyle && ele.setAttribute("style", pStyle);
                ele.removeAttribute("p-style");
            });
        }
    }
    traverseNode(ele, next) {
        next(ele);
        if (ele.hasChildNodes()) {
            for (const item of ele.children) {
                // window.getComputedStyle(item, null)
                // console.log(window.getComputedStyle(item, null).cssText)
                this.traverseNode(item, next);
            }
        }
    }
    print() {
        // console.log(123);
        this.iframe.contentWindow && this.iframe.contentWindow.print();
    }
    copyStyleToIframe(ele, iframe) { }
}

const initConfig = {
    id: "t-print-e",
    frameId: "t-print",
    title: "print page"
};
function init(params) {
    const config = Object.assign(initConfig, params);
    return new P(config, new Iframe(config));
}
if (typeof window !== "undefined") {
    window.p = init;
}

export default init;
//# sourceMappingURL=tprint.js.map
