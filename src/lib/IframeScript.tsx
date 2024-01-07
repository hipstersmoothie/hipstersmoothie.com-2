import Script from "next/script";

const code = function () {
  const query = new URLSearchParams(window.location.search);
  const isInIframe = query.get("in-iframe");

  if (isInIframe) {
    document.body.classList.add("in-iframe");
  }
};

export function IframeScript() {
  return <Script id="iframe">{`(${code})();`}</Script>;
}
