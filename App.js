class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
    }

    activePad() {
        this.classList.toggle('active');
    }

    repeat() {
        let step = this.index % 8;
        this.index++;
        const activePad = document.querySelectorAll(`.b${step}`);
        activePad.forEach(pad => {
            pad.style.animation = 'playTrack .3s alternate ease-in-out 2';
            if(pad.classList.contains('active')) {
                if(pad.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(pad.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(pad.classList.contains('hihate-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
    }

    start() {
        let interval = (60/this.bpm) * 1000;
        setInterval(() => {
            this.repeat()
        }, interval)
    }
}

const drumKit = new Drumkit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    })
})

drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
})