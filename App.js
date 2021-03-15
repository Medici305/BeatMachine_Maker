class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.currentKick = "./sound/kick-big.wav";
    this.snareKick = "./sound/snare-big.wav";
    this.hihatKick = "./sound/hihat-ring.wav";
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    this.index++;
    const activePad = document.querySelectorAll(`.b${step}`);
    activePad.forEach((pad) => {
      pad.style.animation = "playTrack .3s alternate ease-in-out 2";
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }

  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
}

const drumKit = new Drumkit();

// Event listeners
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
  drumKit.updateBtn();
});
