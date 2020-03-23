import { Params } from "./p";
import init from "./main";

export class Iframe {
  iframe: HTMLFrameElement;
  printPage: HTMLElement | null;
  iframeId: string;
  constructor(private config: Params) {
    console.log(config);
    this.iframe = this.createIframe();
    this.printPage = document.getElementById(this.config.id);
    this.iframeId = this.config.id + "-iframe";
  }

  createIframe(): HTMLFrameElement {
    const checkIframe = document.getElementById(
      this.iframeId
    ) as HTMLFrameElement;
    if (!checkIframe) {
      let printFrame = document.createElement("iframe");
      printFrame.setAttribute(
        "style",
        "visibility: hidden; height: 0; width: 0; position: absolute;"
      );
      printFrame.setAttribute("id", this.iframeId);
      printFrame.setAttribute("name", this.iframeId);

      // printFrame.srcdoc = `<html><head><title>${this.config.title}</title></head><body></body></html>`;

      document.getElementsByTagName("body")[0].appendChild(printFrame);
      return document.getElementById(this.iframeId) as HTMLFrameElement;
    }

    return checkIframe;
  }

  cloneToIframe() {
    console.log(this.iframeId);
    if (this.printPage)
      this.traverseNode(this.printPage, (ele: Element) => {
        ele.setAttribute("p-style", window.getComputedStyle(ele, null).cssText);
      });
    if (this.iframeId) {
      // let printFrameObj= document.getElementById(this.config.iframeId).contentWindow;
      const printFrameObj = this.iframe.contentWindow;
      if (printFrameObj) {
        const iframeBody = printFrameObj.document.getElementsByTagName(
          "body"
        )[0];

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

  private removeTempStyle() {
    if (this.printPage)
      this.traverseNode(this.printPage, (ele: Element) => {
        ele.removeAttribute("p-style");
      });

    if (this.iframe.contentWindow) {
      const iframePageEle = this.iframe.contentWindow.document.getElementById(
        this.config.id
      );
      iframePageEle && this.traverseNode(iframePageEle, (ele: Element) => {
        const pStyle = ele.getAttribute("p-style")
        pStyle && ele.setAttribute("style", pStyle);
        ele.removeAttribute("p-style")
      });
    }
  }

  private traverseNode(ele: Element, next: (ele: Element) => void) {
    next(ele);
    if (ele.hasChildNodes()) {
      for (const item of ele.children) {
        // window.getComputedStyle(item, null)
        // console.log(window.getComputedStyle(item, null).cssText)
        this.traverseNode(item, next);
      }
    }
  }

  print(): void {
    // console.log(123);
    this.iframe.contentWindow && this.iframe.contentWindow.print();
  }

  private copyStyleToIframe(ele: HTMLElement, iframe: HTMLFrameElement) {}
}
