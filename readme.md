# RSRTCLib
View demo at sample.html
### High level APIs details

- `startVideoCapture`
    - subject: call this method to open camera and mic media. Asynchronous call returns promise.
    - parameters: 
        - hasAudio - boolean,  if true audio mic also need to be opened 
        - videoResolution - one of those value ('QVGA', 'VGA', 'HD', 'FULLHD'). Default is 'VGA' if not set.
        - fps - framerate of video. Default is 24 if not set.
        - facingMode - value 'user' for front camera, value 'environment' for rear camera. Default is 'user' if not set.
    - promise resolve: mediaStream object contains video (and audio)
    - promise reject: error code (see below error code list)

- `stopVideoCapture`
    - subject: call this method to stop camera. synchronous call.
    - parameters: none
    - return: none
    
- `pauseVideoCapture`
    - subject: call this method to pause camera, synchronous call.
    - parameters: none
    - return: none
    
- `resumeVideoCapture`
    - subject: call this method to resume camera, synchronous call.
    - parameters: none
    - return: none


#### Error Code

- `1001` - AbortError
- `1002` - NotAllowedError
- `1003` - NotFoundError
- `1004` - NotReadableError
- `1005` - OverconstrainedError
- `1006` - SecurityError
- `1007` - TypeError
