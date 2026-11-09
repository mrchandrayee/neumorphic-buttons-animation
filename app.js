(() => {
  const playButton=document.querySelector("#playButton");
  const shareButton=document.querySelector("#shareButton");
  const shareShell=document.querySelector("#shareShell");
  const hint=document.querySelector("#hint");
  const reset=document.querySelector("#reset");
  const closeShare=document.querySelector(".close-share");

  playButton.addEventListener("click",()=>{
    const playing=playButton.classList.toggle("is-playing");
    playButton.setAttribute("aria-pressed",String(playing));
    hint.textContent=playing?"Playing — animated audio waveform active.":"Playback paused.";
  });

  function setShare(open){
    shareShell.classList.toggle("expanded",open);
    shareButton.setAttribute("aria-expanded",String(open));
    shareShell.querySelector(".socials").setAttribute("aria-hidden",String(!open));
    hint.textContent=open?"Choose a share option or close the panel.":"Share panel closed.";
  }
  shareButton.addEventListener("click",()=>setShare(!shareShell.classList.contains("expanded")));
  closeShare.addEventListener("click",()=>setShare(false));

  shareShell.querySelectorAll("[data-share]").forEach(button=>{
    button.addEventListener("click",async()=>{
      const type=button.dataset.share;
      if(type==="copy"){
        try{
          await navigator.clipboard.writeText(window.location.href);
          hint.textContent="Page link copied to clipboard.";
        }catch{
          hint.textContent="Clipboard access unavailable in this browser.";
        }
      }else if(type==="x"){
        const url="https://twitter.com/intent/tweet?url="+encodeURIComponent(window.location.href);
        window.open(url,"_blank","noopener,noreferrer");
        hint.textContent="Opening share composer for X.";
      }else if(type==="facebook"){
        const url="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href);
        window.open(url,"_blank","noopener,noreferrer");
        hint.textContent="Opening Facebook share dialog.";
      }
    });
  });

  reset.addEventListener("click",()=>{
    playButton.classList.remove("is-playing");
    playButton.setAttribute("aria-pressed","false");
    setShare(false);
    hint.textContent="Tap Play or Share to explore the interactions.";
  });
})();