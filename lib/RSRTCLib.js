const QVGA = {
  width: {exact: 320},
  height: {exact: 240}
}

const VGA = {
  width: {exact: 640},
  height: {exact: 480}
};

const HD = {
  width: {exact: 1280},
  height: {exact: 720}
};

const FULLHD = {
  width: {exact: 1920},
  height: {exact: 1080}
};

const ERROR_CODE = {
  'AbortError': 1001,
  'NotAllowedError': 1002,
  'NotFoundError': 1003,
  'NotReadableError': 1004,
  'OverconstrainedError': 1005,
  'SecurityError': 1006,
  'TypeError': 1007
}

class RSRTC {
  constructor() {
    this.localStream = null;
  }
  _getVideoResolution(resolution) {
    switch (resolution) {
      case 'QVGA':
        return QVGA;

      case 'VGA':
        return VGA;

      case 'HD':
        return HD;

      case 'FULLHD':
        return FULLHD;

      default:
        return VGA;
    }
  }

  _getConstraint(hasAudio = true, videoResolution = 'VGA',  frameRate = 24, facingMode = "user") {
    return {
      audio: hasAudio !== false,
      video: {
        ...this._getVideoResolution(videoResolution),
        frameRate: frameRate,
        facingMode: facingMode
      }
    }
  }

  _handleErrorCode(errorName) {
    console.log("Error: " + errorName + ' ' + ERROR_CODE[errorName]);
  }

  async startVideoCapture(hasAudio, videoResolution, frameRate, facingMode) {
    try {
      const constraint = this._getConstraint(hasAudio, videoResolution, frameRate, facingMode);
      const stream = await navigator.mediaDevices.getUserMedia(constraint);
      this.localStream = stream;
      return stream;
    } catch (e) {
      this._handleErrorCode(e.name)
    }
  }

  stopVideoCapture() {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => track.stop());
    }
  }

  pauseVideoCapture() {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => track.enabled = false);
    }
  }

  resumeVideoCapture() {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => track.enabled = true);
    }
  }

  async startAudioCapture() {
    try {
      const constraint = {
        video: false,
        audio: true
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraint);
      this.localStream = stream;
      return stream;
    } catch (e) {
      this._handleErrorCode(e.name)
    }
  }

  stopAudioCapture() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => track.stop());
    }
  }

  pauseAudioCapture() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => track.enabled = false);
    }
  }

  resumeAudioCapture() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => track.enabled = true);
    }
  }
}