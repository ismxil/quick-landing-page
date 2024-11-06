(()=>{
    var n = !1;
    try {
        let e = Object.defineProperty({}, "passive", {
            get() {
                n = !0
            }
        });
        window.addEventListener("testPassive", null, e),
        window.removeEventListener("testPassive", null, e)
    } catch (e) {}
    function d(e) {
        let {bottom: o, top: t} = e.getBoundingClientRect();
        return !(o > window.innerHeight || t < 0)
    }
    var i = document.querySelector(".cards");
    if (i) {
        let o = function() {
            return Math.max(window.scrollY - i.offsetTop + window.innerHeight, 0)
        };
        m = o;
        let e = Array.prototype.slice.call(i.children);
        e.forEach(t=>t.addEventListener("click", ({target: a})=>{
            if (a.nodeType === Node.ELEMENT_NODE && a.classList.contains("close")) {
                e.filter(s=>s !== t).forEach(s=>s.classList.remove("stack-1", "stack-2", "stack-3")),
                t.classList.remove("active"),
                i.classList.remove("has-active"),
                i.style.removeProperty("--stack-item-height-active");
                return
            }
            t.classList.contains("active") || (i.classList.contains("has-active") && e.forEach(s=>s.classList.remove("active", "stack-1", "stack-2", "stack-3")),
            t.classList.add("active"),
            e.filter(s=>s !== t).forEach((s,l)=>s.classList.add(`stack-${l + 1}`)),
            i.classList.add("has-active"),
            requestAnimationFrame(()=>i.style.setProperty("--stack-item-height-active", window.getComputedStyle(t).getPropertyValue("height"))),
            setTimeout(()=>{
                i.style.setProperty("--stack-item-height-active", window.getComputedStyle(t).getPropertyValue("height")),
                d(t.querySelector("h3")) || t.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                })
            }
            , 200))
        }
        )),
        window.addEventListener("scroll", ()=>{
            let t = o();
            e.forEach(a=>{
                if (!a.matches("[data-parallax]"))
                    return;
                let {parallaxSpeed: s} = a.dataset
                  , l = window.getComputedStyle(a).getPropertyValue("--stack-item-offset-initial")
                  , r = document.createElement("div");
                document.body.insertBefore(r, document.body.firstElementChild),
                r.style.width = l,
                l = window.getComputedStyle(r).width,
                r.parentNode.removeChild(r),
                l = parseInt(l, 10),
                s = parseFloat(s);
                let c = t * s;
                a.style.setProperty("--stack-item-offset", `-${c >= l ? 0 : l - c}px`)
            }
            )
        }
        , n ? {
            passive: !0
        } : !1),
        i.classList.add("cards-initialized")
    }
    var m, u = Array.prototype.slice.call(document.querySelectorAll("[data-scroll]"));
    u.forEach(e=>e.addEventListener("click", o=>{
        let {target: t} = o
          , a = t.dataset.target || t.getAttribute("href")
          , s = document.querySelector(a);
        o.preventDefault(),
        s && s.scrollIntoView({
            block: "start",
            behavior: "smooth"
        })
    }
    ));
    if ("loading"in HTMLImageElement.prototype)
        document.querySelectorAll(".lazyload").forEach(o=>o.src = o.dataset.src);
    else {
        let e = document.createElement("script");
        e.async = !0,
        e.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.1/lazysizes.min.js",
        document.body.appendChild(e)
    }
}
)();
