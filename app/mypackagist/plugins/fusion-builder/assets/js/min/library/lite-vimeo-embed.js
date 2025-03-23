if("undefined"==typeof LiteVimeo){class e extends HTMLElement{constructor(){super()}connectedCallback(){this.videoId=encodeURIComponent(this.getAttribute("videoid"));const t=document.createElement("button");t.type="button",t.classList.add("ltv-playbtn"),this.appendChild(t),this.addEventListener("pointerover",e._warmConnections,{once:!0}),this.addEventListener("click",this.callbackIframe)}callbackIframe(){this._addIframe(),this.removeEventListener("click",this.callbackIframe)}static _warmConnections(){e.preconnected||(vimeoLiteAddPrefetch("preconnect","https://player.vimeo.com"),vimeoLiteAddPrefetch("preconnect","https://i.vimeocdn.com"),vimeoLiteAddPrefetch("preconnect","https://f.vimeocdn.com"),vimeoLiteAddPrefetch("preconnect","https://fresnel.vimeocdn.com"),e.preconnected=!0)}_addIframe(){const e=new URLSearchParams(this.getAttribute("params")||[]),t=`\n    <iframe width="640" height="360" frameborder="0"\n    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\n    src="https://player.vimeo.com/video/${this.videoId}?${e.toString().replace("&start=","#t=")}"\n    ></iframe>`;this.insertAdjacentHTML("beforeend",t),this.classList.add("ltv-activated")}}void 0===customElements.get("lite-vimeo")&&customElements.define("lite-vimeo",e)}function vimeoLiteAddPrefetch(e,t,n){const i=document.createElement("link");i.rel=e,i.href=t,n&&(i.as=n),i.crossorigin=!0,document.head.appendChild(i)}function vimeoLiteCanUseWebP(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))&&0===e.toDataURL("image/webp").indexOf("data:image/webp")}function vimeoLiteGetThumbnailDimensions({width:e,height:t}){let n=e=e||960,i=t=t||540;return n%320!=0&&(n=100*Math.ceil(e/100),i=Math.round(n/e*t)),{width:n,height:i}}!function(){function e(){jQuery&&jQuery(document).ajaxComplete(function(){t()})}function t(){var e=document.querySelectorAll("lite-vimeo");if("IntersectionObserver"in window){let i=new IntersectionObserver(function(e){jQuery.each(e,function(e,o){o.isIntersecting&&(t(o.target),o.target.addEventListener("click",n),i.unobserve(o.target))})},{root:null,rootMargin:"0px",threshold:0});e.forEach(function(e){e.getAttribute("data-fusion-vimeo-thumbnail-loaded")||i.observe(e)})}else e.forEach(function(e){e.getAttribute("data-fusion-vimeo-thumbnail-loaded")||(t(e),e.addEventListener("click",n))});function t(e){var t=new XMLHttpRequest,n=e.getAttribute("videoid");e.setAttribute("data-fusion-vimeo-thumbnail-loaded","true"),t.onload=function(){if(this.status>=200&&this.status<400){var t,n,i,o,r,a=JSON.parse(this.responseText),c=window.devicePixelRatio||1;t=vimeoLiteGetThumbnailDimensions(e.getBoundingClientRect()),n=Math.round(t.width*c),i=Math.round(t.height*c),"object"==typeof a&&null!==a&&"string"==typeof a.thumbnail_url&&a.thumbnail_url&&(r=a.thumbnail_url,0<n&&0<i&&(o=/d_\d+x\d+$/.test(a.thumbnail_url),r=o?a.thumbnail_url.replace(/d_\d+x\d+$/,"d_"+n+"x"+i):a.thumbnail_url.replace(/d_\d+$/,"d_"+n+"x"+i)),setTimeout(function(){e.style.backgroundImage='url("'+r+'")'},200))}},t.open("GET","https://vimeo.com/api/oembed.json?url=https://vimeo.com/"+encodeURIComponent(n),!0),t.send()}function n(e){e.currentTarget.removeEventListener("click",n),e.currentTarget.classList.add("awb-lite-vimeo-no-background"),e.currentTarget.style.backgroundImage=""}}document.addEventListener("DOMContentLoaded",t),document.addEventListener("DOMContentLoaded",e),"interactive"!==document.readyState&&"complete"!==document.readyState||(t(),e()),jQuery(window).on("awb-privacy-placeholders-removed",t)}();