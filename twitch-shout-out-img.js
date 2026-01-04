document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = new URLSearchParams(location.search);
    const client = new StreamerbotClient({
      host: params.get("host"),
      port: parseInt(params.get("port"), 10),
      endpoint: params.get("endpoint"),
      password: params.get("password"),
      autoReconnect: true,
      immediate: true,
    });

    const html = document.documentElement;
    const body = document.body;
    if (!html || !body) {
      console.error(
        `Es fehlen im HTML-Dokument der HTML-Tag oder der Body-Tag. html=${html}, body=${body}!`
      );
      return;
    }

    const fontFamilyVar = "--font-family-var";
    const robotoBold = getComputedStyle(html)
      .getPropertyValue(fontFamilyVar)
      .trim();
    if (!robotoBold) {
      console.error(
        "In CSS-Dokument fehlt der Font-Family Proportion als Inhalt!"
      );
      return;
    }

    const copy = "copy";
    const dragstart = "dragstart";
    const keydown = "keydown";
    const select = "select";

    const none = "none";
    const def = "default";
    const hidden = "hidden";
    const visible = "visible";
    const zero = 0;
    const one = 1;

    (function bodyToken() {
      const eventArray = [copy, dragstart, keydown, select];
      eventArray.forEach((event) => {
        if (!event) return;

        body.addEventListener(event, (e) => e.preventDefault());
      });

      if (robotoBold) {
        Object.assign(body.style, {
          fontFamily: robotoBold,
          webkitUserSelect: none,
          userSelect: none,
          cursor: def,
          pointerEvents: none,
        });
      }
    })();

    const style = document.querySelector("style");
    if (!style) {
      console.error("Der Style-Tag in HTML-Dokument fehlt, ist gelöscht!");
      return;
    }

    const $ = (id) =>
      document.getElementById(id) || document.querySelector("#" + id);

    const mainDiv = $("mainContainerId");
    const subDiv = $("subContainerId");
    const coverImgDiv = $("coverImgContainerId");
    const imgBgMainDiv = $("imgBgMainContainerId");
    const bgImgDiv = $("backgroundImgContainerId");
    const twitchSoImg = $("twitchSoImgId");
    const twitchRaidTitleDiv = $("twitchRaidTitleContainerId");
    const twitchRaidTitleHone = $("twitchRaidTitleId");
    const twitchRaidTitleNameDiv = $("twitchRaidTitleNameContainerId");
    const twitchRaidNameTitleHtwo = $("twitchRaidNameTitleId");
    const raidTitleTxtDiv = $("raidTitleTxtContainerId");
    const raidTitleTxtHThree = $("raidTitleTxtId");
    const twitchViewerTitleDiv = $("twitchViewerTitleContainerId");
    const twitchViewerTitleHFour = $("twitchViewerTitleId");
    const twitchViewerNumberDiv = $("twitchViewerNumberContainerId");
    const twitchViewerNumberHFive = $("twitchViewerNumberId");
    const twitchGameMainDiv = $("twitchGameMainContainerId");
    const twitchGameImgDiv = $("twitchGameImgContainerId");
    const twitchGameImg = $("twitchGameImgId");
    const twitchGameNameDiv = $("twitchGameNameContainerId");
    const twitchGameNameHSix = $("twitchGameNameId");

    subDiv.style.background = "rgba(30, 30, 30, 0.9)";
    subDiv.style.filter =
      "blur(1.5px) drop-shadow(0 0 10px rgba(30, 30, 30, 0.8))";
    coverImgDiv.style.filter =
      "grayscale(0.5%) brightness(75%) blur(5px) contrast(105%) sepia(25%) opacity(1) sepia(1.5%) hue-rotate(-5deg) drop-shadow(0 0 10px rgba(30, 30, 30, 0.8))";

    function elementSecurityToken() {
      const elementArray = [
        mainDiv,
        subDiv,
        coverImgDiv,
        imgBgMainDiv,
        bgImgDiv,
        twitchSoImg,
        twitchRaidTitleDiv,
        twitchRaidTitleHone,
        twitchRaidTitleNameDiv,
        twitchRaidNameTitleHtwo,
        raidTitleTxtDiv,
        raidTitleTxtHThree,
        twitchViewerTitleDiv,
        twitchViewerTitleHFour,
        twitchViewerNumberDiv,
        twitchViewerNumberHFive,
        twitchGameMainDiv,
        twitchGameImgDiv,
        twitchGameImg,
        twitchGameNameDiv,
        twitchGameNameHSix,
      ];

      const eventArray = [copy, dragstart, keydown, select];

      elementArray.forEach((element) => {
        if (!element) return;

        eventArray.forEach((event) => {
          if (!event) return;

          element.addEventListener(event, (e) => e.preventDefault());
        });

        if (robotoBold) {
          Object.assign(element.style, {
            fontFamily: robotoBold,
            webkitUserSelect: none,
            userSelect: none,
            cursor: def,
            pointerEvents: none,
          });
        }
      });
    }
    elementSecurityToken();

    let currentShoutOut = {
      imageId: null,
      userName: null,
      viewerNumber: null,
      gameBoxArtId: null,
      gameName: null,
      imageDuration: null,
    };

    let shoutOutQueue = [];
    let isAnimationRunning = false;
    let startTimeout = null;

    const TIMING = {
      setTimeDelay: 300,
      delay: 800,
      onOff: 600,
      duration: 10000,
      bgImgDivDelay: 800,
      twitchSoImgDelay: 1200,
      autoStartDelay: 300,
    };

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    function resetAllData() {
      console.log("🧹 Komplettes Reset - Alle Daten werden gelöscht...");

      currentShoutOut = {
        imageId: null,
        userName: null,
        viewerNumber: null,
        gameBoxArtId: null,
        gameName: null,
        imageDuration: null,
      };

      coverImgDiv.style.backgroundImage = "url('')";
      twitchSoImg.src = "";
      twitchSoImg.alt = "";
      twitchRaidTitleHone.innerText = "Danke für deinen Raid!";
      twitchRaidNameTitleHtwo.textContent = "";
      raidTitleTxtHThree.innerText = "Du raidet grade";
      twitchViewerTitleHFour.innerText = "Zuschauer:";
      twitchViewerNumberHFive.textContent = "";
      twitchGameImg.src = "";
      twitchGameImg.alt = "";
      twitchGameNameHSix.textContent = "";

      [
        subDiv,
        coverImgDiv,
        bgImgDiv,
        twitchSoImg,
        twitchRaidTitleHone,
        twitchRaidNameTitleHtwo,
        raidTitleTxtHThree,
        twitchViewerTitleHFour,
        twitchViewerNumberHFive,
        twitchGameImgDiv,
        twitchGameImg,
        twitchGameNameHSix,
      ].forEach((el) => {
        if (el) {
          el.className = el.className
            .split(" ")
            .filter(
              (c) =>
                !c.includes("fade") &&
                !c.includes("slide") &&
                !c.includes("rotated")
            )
            .join(" ");
        }
      });

      console.log("✅ Reset komplett - Bereit für neuen Shout-Out");
    }

    function hasMinimumData() {
      return (
        currentShoutOut.userName !== null &&
        (currentShoutOut.imageId !== null ||
          currentShoutOut.gameBoxArtId !== null)
      );
    }

    function scheduleAnimationStart() {
      if (startTimeout) {
        clearTimeout(startTimeout);
      }

      startTimeout = setTimeout(() => {
        if (hasMinimumData() && !isAnimationRunning) {
          console.log("🚀 Auto-Start: Mindestdaten vorhanden");
          startNextShoutOut();
        }
      }, TIMING.autoStartDelay);
    }

    client.on("StreamElements.Connected", (data) => {
      console.log("📢 StreamElements verbunden:", data);
    });

    client.on("Twitch.ShoutoutCreated", (data) => {
      console.log("📢 Twitch Shout-Out erstellt:", data);
    });

    client.on("Misc.GlobalVariableUpdated", ({ data }) => {
      if (!data || !data.name) return;

      const value = data.newValue || "";
      let dataChanged = false;

      switch (data.name) {
        case "twitchShoutOutUserImageId":
          if (currentShoutOut.imageId !== value) {
            currentShoutOut.imageId = value;
            dataChanged = true;
            console.log("📸 ImageId:", value);
          }
          break;
        case "twitchShoutOutUserName":
          if (currentShoutOut.userName !== value) {
            currentShoutOut.userName = value;
            dataChanged = true;
            console.log("👤 UserName:", value);
          }
          break;
        case "twitchShoutOutUserViewerNumber":
          const viewerNum = parseInt(value, 10) || 0;
          if (currentShoutOut.viewerNumber !== viewerNum) {
            currentShoutOut.viewerNumber = viewerNum;
            dataChanged = true;
            console.log("👁️ ViewerNumber:", viewerNum);
          }
          break;
        case "twitchShoutOutUserGameBoxArtId":
          if (currentShoutOut.gameBoxArtId !== value) {
            currentShoutOut.gameBoxArtId = value;
            dataChanged = true;
            console.log("🎮 GameBoxArtId:", value);
          }
          break;
        case "twitchShoutOutUserGame":
          if (currentShoutOut.gameName !== value) {
            currentShoutOut.gameName = value;
            dataChanged = true;
            console.log("🎯 GameName:", value);
          }
          break;
        case "twitchImageDuration":
          if (currentShoutOut.imageDuration !== value) {
            currentShoutOut.imageDuration = value;
            dataChanged = true;
            console.log("⏱️ Image Duration:", value);
          }
          break;
        default:
          return;
      }

      if (dataChanged) {
        scheduleAnimationStart();
      }
    });

    function twitchRaidNameSlice(name) {
      if (!name) return "";
      return name.length > 50 ? name.slice(0, 50).trim() + "..." : name;
    }

    function twitchGameNameSlice(gameName) {
      if (!gameName) return "";
      return gameName.length > 50
        ? gameName.slice(0, 50).trim() + "..."
        : gameName;
    }

    function updateDOM() {
      const aspectRatio = 300;
      const widthUrl = 200;
      const heightUrl = 400;

      if (currentShoutOut.imageId) {
        const imgUrl = `https://static-cdn.jtvnw.net/jtv_user_pictures/${currentShoutOut.imageId}-profile_image-${aspectRatio}x${aspectRatio}.png`;
        coverImgDiv.style.backgroundImage = `url("${imgUrl}")`;
        twitchSoImg.src = imgUrl;
      }

      if (currentShoutOut.userName) {
        const displayName = twitchRaidNameSlice(currentShoutOut.userName);
        twitchSoImg.alt = displayName;
        twitchRaidNameTitleHtwo.textContent = displayName;
      }

      if (currentShoutOut.viewerNumber !== null) {
        twitchViewerNumberHFive.textContent = `${currentShoutOut.viewerNumber} Viewer`;
      }

      if (currentShoutOut.gameBoxArtId) {
        twitchGameImg.src = `https://static-cdn.jtvnw.net/ttv-boxart/${currentShoutOut.gameBoxArtId}-${widthUrl}x${heightUrl}.jpg`;
      }

      if (currentShoutOut.gameName) {
        const displayGame = twitchGameNameSlice(currentShoutOut.gameName);
        twitchGameImg.alt = displayGame;
        twitchGameNameHSix.textContent = displayGame;
      }
    }

    function hideAllElements() {
      const elementArrayHidden = [
        mainDiv,
        subDiv,
        coverImgDiv,
        bgImgDiv,
        twitchSoImg,
        twitchRaidTitleHone,
        twitchRaidNameTitleHtwo,
        raidTitleTxtHThree,
        twitchViewerTitleHFour,
        twitchViewerNumberHFive,
        twitchGameImgDiv,
        twitchGameImg,
        twitchGameNameHSix,
      ].filter(Boolean);

      mainDiv.style.display = none;

      elementArrayHidden.forEach((element) => {
        element.style.visibility = hidden;
        element.style.opacity = zero;
      });
    }

    async function startNextShoutOut() {
      if (isAnimationRunning) {
        console.log("⏸️ Animation läuft bereits - Shout-Out übersprungen");
        return;
      }

      if (!hasMinimumData()) {
        console.warn("⚠️ Nicht genug Daten für Shout-Out");
        return;
      }

      isAnimationRunning = true;
      console.log("▶️ Animation startet...");

      try {
        updateDOM();
        await runAnimation();
      } catch (error) {
        console.error("❌ Fehler in Animation:", error);
      } finally {
        isAnimationRunning = false;
        resetAllData();
        console.log("✅ Animation beendet und zurückgesetzt");
      }
    }

    async function runAnimation() {
      const classFadeIn = "fade-in";
      const classFadeOut = "fade-out";
      const classRotatedSlideIn = "rotated-slide-in";
      const classRotatedSlideOut = "rotated-slide-out";
      const classTextSlideOut = "text-slide-out";
      const classTextSlideIn = "text-slide-in";

      const mainDivProperty =
        "display 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95), " +
        "visibility 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95), " +
        "opacity 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
      const transitionProperty =
        "visibility 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95), " +
        "opacity 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)";

      style.innerHTML = `
        .twitch-so-img[alt="${currentShoutOut.userName}"] {
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          align-content: center;
          justify-items: center;
          justify-content: center;
          text-align: center;
          font-size: 20px;
          color: rgba(0, 0, 0, 0);
          text-decoration: none;
        }

        .twitch-game-img[alt="${currentShoutOut.gameName}"] {
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          align-content: center;
          justify-items: center;
          justify-content: center;
          text-align: center;
          font-size: 20px;
          color: rgba(0, 0, 0, 0);
          text-decoration: none;
        }
      `;

      hideAllElements();

      setTimeout(() => {
        mainDiv.style.removeProperty("display");
        mainDiv.style.visibility = visible;
        mainDiv.style.opacity = one;
        mainDiv.style.transition = mainDivProperty;
      }, TIMING.setTimeDelay);

      await wait(TIMING.delay);

      subDiv.style.visibility = visible;
      subDiv.style.opacity = one;
      subDiv.style.transition = transitionProperty;
      subDiv.classList.remove(classFadeOut);
      subDiv.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      coverImgDiv.style.visibility = visible;
      coverImgDiv.style.opacity = one;
      coverImgDiv.style.transition = transitionProperty;
      coverImgDiv.classList.remove(classFadeOut);
      coverImgDiv.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      bgImgDiv.style.visibility = visible;
      bgImgDiv.style.opacity = one;
      bgImgDiv.style.transition = transitionProperty;
      bgImgDiv.classList.remove(classFadeOut);
      bgImgDiv.classList.add(classFadeIn);
      await wait(TIMING.bgImgDivDelay);

      twitchSoImg.style.visibility = visible;
      twitchSoImg.style.opacity = one;
      twitchSoImg.style.transition = transitionProperty;
      twitchSoImg.classList.remove(classRotatedSlideOut);
      twitchSoImg.classList.add(classRotatedSlideIn);
      await wait(TIMING.twitchSoImgDelay);

      twitchRaidTitleHone.style.visibility = visible;
      twitchRaidTitleHone.style.opacity = one;
      twitchRaidTitleHone.style.transition = transitionProperty;
      twitchRaidTitleHone.classList.remove(classFadeOut);
      twitchRaidTitleHone.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      twitchRaidNameTitleHtwo.style.visibility = visible;
      twitchRaidNameTitleHtwo.style.opacity = one;
      twitchRaidNameTitleHtwo.style.transition = transitionProperty;
      twitchRaidNameTitleHtwo.classList.remove(classFadeOut);
      twitchRaidNameTitleHtwo.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      raidTitleTxtHThree.style.visibility = visible;
      raidTitleTxtHThree.style.opacity = one;
      raidTitleTxtHThree.style.transition = transitionProperty;
      raidTitleTxtHThree.classList.remove(classFadeOut);
      raidTitleTxtHThree.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      twitchViewerTitleHFour.style.visibility = visible;
      twitchViewerTitleHFour.style.opacity = one;
      twitchViewerTitleHFour.style.transition = transitionProperty;
      twitchViewerTitleHFour.classList.remove(classFadeOut);
      twitchViewerTitleHFour.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      twitchViewerNumberHFive.style.visibility = visible;
      twitchViewerNumberHFive.style.opacity = one;
      twitchViewerNumberHFive.style.transition = transitionProperty;
      twitchViewerNumberHFive.classList.remove(classFadeOut);
      twitchViewerNumberHFive.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      twitchGameImgDiv.style.visibility = visible;
      twitchGameImg.style.visibility = visible;
      twitchGameImgDiv.style.opacity = one;
      twitchGameImg.style.opacity = one;
      twitchGameImgDiv.style.transition = transitionProperty;
      twitchGameImg.style.transition = transitionProperty;
      twitchGameImgDiv.classList.remove(classFadeOut);
      twitchGameImg.classList.remove(classFadeOut);
      twitchGameImgDiv.classList.add(classFadeIn);
      twitchGameImg.classList.add(classFadeIn);
      await wait(TIMING.onOff);

      twitchGameNameHSix.style.visibility = visible;
      twitchGameNameHSix.style.opacity = one;
      twitchGameNameHSix.style.transition = transitionProperty;
      twitchGameNameHSix.classList.remove(classTextSlideIn);
      twitchGameNameHSix.classList.add(classTextSlideOut);

      await wait(TIMING.duration);

      twitchGameNameHSix.style.visibility = hidden;
      twitchGameNameHSix.style.opacity = zero;
      twitchGameNameHSix.style.transition = transitionProperty;
      twitchGameNameHSix.classList.remove(classTextSlideOut);
      twitchGameNameHSix.classList.add(classTextSlideIn);
      await wait(TIMING.onOff);

      twitchGameImgDiv.style.visibility = hidden;
      twitchGameImg.style.visibility = hidden;
      twitchGameImgDiv.style.opacity = zero;
      twitchGameImg.style.opacity = zero;
      twitchGameImgDiv.style.transition = transitionProperty;
      twitchGameImg.style.transition = transitionProperty;
      twitchGameImgDiv.classList.remove(classFadeIn);
      twitchGameImg.classList.remove(classFadeIn);
      twitchGameImgDiv.classList.add(classFadeOut);
      twitchGameImg.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      twitchViewerNumberHFive.style.visibility = hidden;
      twitchViewerNumberHFive.style.opacity = zero;
      twitchViewerNumberHFive.style.transition = transitionProperty;
      twitchViewerNumberHFive.classList.remove(classFadeIn);
      twitchViewerNumberHFive.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      twitchViewerTitleHFour.style.visibility = hidden;
      twitchViewerTitleHFour.style.opacity = zero;
      twitchViewerTitleHFour.style.transition = transitionProperty;
      twitchViewerTitleHFour.classList.remove(classFadeIn);
      twitchViewerTitleHFour.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      raidTitleTxtHThree.style.visibility = hidden;
      raidTitleTxtHThree.style.opacity = zero;
      raidTitleTxtHThree.style.transition = transitionProperty;
      raidTitleTxtHThree.classList.remove(classFadeIn);
      raidTitleTxtHThree.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      twitchRaidNameTitleHtwo.style.visibility = hidden;
      twitchRaidNameTitleHtwo.style.opacity = zero;
      twitchRaidNameTitleHtwo.style.transition = transitionProperty;
      twitchRaidNameTitleHtwo.classList.remove(classFadeIn);
      twitchRaidNameTitleHtwo.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      twitchRaidTitleHone.style.visibility = hidden;
      twitchRaidTitleHone.style.opacity = zero;
      twitchRaidTitleHone.style.transition = transitionProperty;
      twitchRaidTitleHone.classList.remove(classFadeIn);
      twitchRaidTitleHone.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      twitchSoImg.style.visibility = hidden;
      twitchSoImg.style.opacity = zero;
      twitchSoImg.style.transition = transitionProperty;
      twitchSoImg.classList.remove(classRotatedSlideIn);
      twitchSoImg.classList.add(classRotatedSlideOut);
      await wait(TIMING.twitchSoImgDelay);

      bgImgDiv.style.visibility = hidden;
      bgImgDiv.style.opacity = zero;
      bgImgDiv.style.transition = transitionProperty;
      bgImgDiv.classList.remove(classFadeIn);
      bgImgDiv.classList.add(classFadeOut);
      await wait(TIMING.bgImgDivDelay);

      subDiv.style.visibility = hidden;
      subDiv.style.opacity = zero;
      subDiv.style.transition = transitionProperty;
      subDiv.classList.remove(classFadeIn);
      subDiv.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      coverImgDiv.style.visibility = hidden;
      coverImgDiv.style.opacity = zero;
      coverImgDiv.style.transition = transitionProperty;
      coverImgDiv.classList.remove(classFadeIn);
      coverImgDiv.classList.add(classFadeOut);
      await wait(TIMING.onOff);

      mainDiv.style.display = none;
      mainDiv.style.visibility = hidden;
      mainDiv.style.opacity = zero;
      mainDiv.style.transition = mainDivProperty;

      await wait(TIMING.delay);
    }

    hideAllElements();

    console.log("🎬 Twitch Shout-Out System bereit!");
  } catch (error) {
    console.error("❌ Haupt-Fehler:", error);
  }
});
