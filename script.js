/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Peace Life",
          artist: "Relaxing",
          cover: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2022/01/12/audio_45cacdef8f.mp3?filename=both-of-us-14037.mp3",
          url: "",
          favorited: true
        },
        {
          name: "Peace Life",
          artist: "Chill",
          cover: "https://images.pexels.com/photos/6577906/pexels-photo-6577906.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/11/30/audio_b946bb80da.mp3?filename=lofi-hip-hop-11489.mp3",
          url: "",
          favorited: true
        },
        {
          name: "Peace Life",
          artist: "Meditation",
          cover: "https://images.pexels.com/photos/8494957/pexels-photo-8494957.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2022/01/09/audio_7b83b170f4.mp3?filename=chilling-waves-ambient-chill-out-music-for-relaxation-13880.mp3",
          url: "",
          favorited: false
        },
        {
          name: "Peace Life",
          artist: "OM Meditation",
          cover: "https://images.pexels.com/photos/8436769/pexels-photo-8436769.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/05/26/audio_7746ffb8dd.mp3?filename=wear-headphones-om-meditation-to-energize-yourself-positively-we-appreciate-your-donation-it-helps-our-service-to-people-in-need-in-my-city-4677.mp3",
          url: "",
          favorited: false
        },
        {
          name: "Peace Life",
          artist: "432 HZ",
          cover: "https://images.pexels.com/photos/4107414/pexels-photo-4107414.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/11/08/audio_42f63ad575.mp3?filename=drifting-at-432-hz-unicorn-heads-10507.mp3",
          url: "",
          favorited: true
        },
        {
          name: "Peace Life",
          artist: "OM 8D Meditation",
          cover: "https://images.pexels.com/photos/8900263/pexels-photo-8900263.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/05/01/audio_9125683c48.mp3?filename=magnifico-mantra-om-8d-musica-para-transcender-som-para-meditar-mantra-renovador-de-energias-4224.mp3",
          url: "",
          favorited: false
        },
        {
          name: "Peace Life",
          artist: "SKY",
          cover: "https://images.pexels.com/photos/848573/pexels-photo-848573.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/08/23/audio_dfbee010eb.mp3?filename=autumn-sky-meditation-7618.mp3",
          url: "",
          favorited: true
        },
        {
          name: "Peace Life",
          artist: "Rain Forest",
          cover: "https://images.pexels.com/photos/1019980/pexels-photo-1019980.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          source: "https://cdn.pixabay.com/download/audio/2020/12/30/audio_31b7f16d46.mp3?filename=rain-forest-sleep-yoga-meditation-relaxation-2044.mp3",
          url: "",
          favorited: false
        },
        {
          name: "Peace Life",
          artist: "River",
          cover: "https://images.pexels.com/photos/119866/pexels-photo-119866.jpeg?auto=compress&cs=tinysrgb2&h=500&w=500",
          source: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_d319914b2b.mp3?filename=the-old-water-mill-meditation-8005.mp3",
          url: "",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
