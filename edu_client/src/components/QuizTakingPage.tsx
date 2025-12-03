import QuizAssessmentComponent from "@/components/TakeAssessmentComponent";
import { useState, useEffect, useRef } from "react";
import { Camera, Monitor, AlertTriangle, CheckCircle } from "lucide-react";

const QuizAssessment = () => (
  <div className="p-8 text-center">
    <QuizAssessmentComponent />
  </div>
);

const ProctoredQuizPage = () => {
  const [stage, setStage] = useState('permissions'); // permissions → countdown → quiz
  const [streams, setStreams] = useState({ cameraStream: null, screenStream: null });
  const [countdown, setCountdown] = useState(6);
  const [violations, setViolations] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [cheatingScore, setCheatingScore] = useState(0);

  const videoRef = useRef(null);

  // ✅ Move to countdown after permissions granted
  const handlePermissionsGranted = ({ cameraStream, screenStream }) => {
    setStreams({ cameraStream, screenStream });
    setStage('countdown');
  };

  // ✅ Fullscreen Lock
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  // ✅ Countdown timer logic + fullscreen enforcement
  useEffect(() => {
    if (stage !== 'countdown') return;

    enterFullscreen();

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          setStage('quiz');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  // ✅ Warning & Auto-submit logic (unchanged except stage check)
  useEffect(() => {
    if (stage !== 'quiz') return;

    const handleVisibilityChange = () => {
      if (document.hidden) registerViolation("Tab switch detected");
    };
    const handleBlur = () => registerViolation("Window lost focus");

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [stage, violations]);

  const addCheatingPoints = (points) => {
  setCheatingScore(prev => Math.min(prev + points, 100)); // capped at 100
};

  const registerViolation = (message) => {
    const newCount = violations + 1;
    setViolations(newCount);
    addCheatingPoints(15);
    setWarningMessage(`${message} (${newCount}/3)`);
    setShowWarning(true);
    

    setTimeout(() => setShowWarning(false), 2500);

    if (newCount >= 3) handleAutoSubmit(message);
  };

  useEffect(() => {
  if (!videoRef.current || stage !== 'quiz') return;

  const checkFacePresence = setInterval(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    // Get brightness sample to detect if camera feed is blocked/covered
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0;
    for (let i = 0; i < frame.length; i += 4) {
      sum += frame[i] + frame[i+1] + frame[i+2];
    }
    const brightness = sum / (frame.length * 3);

    if (brightness < 25) {
      // camera covered / too dark
      addCheatingPoints(5);
    }
  }, 5000);

  return () => clearInterval(checkFacePresence);
}, [stage]);


  const handleAutoSubmit = (reason) => {
    alert(`Assessment auto-submitted: ${reason}`);
    streams.cameraStream?.getTracks().forEach(t => t.stop());
    streams.screenStream?.getTracks().forEach(t => t.stop());
  };

  // Prevent right-click and certain keyboard shortcuts 
  useEffect(() => { if (stage !== 'quiz') return; const handleContextMenu = (e) => { e.preventDefault(); setWarningMessage('Right-click is disabled during assessment'); setShowWarning(true); setTimeout(() => setShowWarning(false), 2000); }; const handleKeyDown = (e) => { if ((e.ctrlKey && (e.key === 't' || e.key === 'w' || e.key === 'n')) || (e.metaKey && (e.key === 't' || e.key === 'w' || e.key === 'n')) || e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) { e.preventDefault(); setWarningMessage('This action is not allowed during assessment'); setShowWarning(true); setTimeout(() => setShowWarning(false), 2000); } }; document.addEventListener('contextmenu', handleContextMenu); document.addEventListener('keydown', handleKeyDown); return () => { document.removeEventListener('contextmenu', handleContextMenu); document.removeEventListener('keydown', handleKeyDown); }; }, [stage]);

  // Cleanup on unmount 
  useEffect(() => { return () => { if (streams.cameraStream) { streams.cameraStream.getTracks().forEach(track => track.stop()); } if (streams.screenStream) { streams.screenStream.getTracks().forEach(track => track.stop()); } }; }, [streams]);
  // ✅ UI STAGE RENDER LOGIC
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Permission Modal on Blank Screen */}
      {stage === 'permissions' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <PermissionSetup onPermissionsGranted={handlePermissionsGranted} />
        </div>
      )}

      {/* Countdown Screen */}
      {stage === 'countdown' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 animate-pulse">{countdown}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Preparing your assessment environment…
            </p>

            <button
              onClick={() => setStage('quiz')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Skip Countdown
            </button>
          </div>
        </div>
      )}

      {/* Quiz Stage */}
      {stage === 'quiz' && (
        <>
          {showWarning && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl z-50">
              <AlertTriangle className="inline mr-2" /> {warningMessage}
            </div>
          )}
          <div className="fixed top-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-gray-300 dark:border-gray-600">
            <div className="text-sm font-semibold">
              Cheating Score: <span className={cheatingScore > 60 ? "text-red-600" : cheatingScore > 30 ? "text-orange-500" : "text-green-600"}>{cheatingScore}/100</span>
            </div>
          </div>


          {/* Camera Bubble */}
          <div className="fixed bottom-4 right-4 z-40 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-red-500">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>

          <QuizAssessment />
        </>
      )}
    </div>
  );
};

const PermissionSetup = ({ onPermissionsGranted }) => {
  const [cameraStatus, setCameraStatus] = useState(onPermissionsGranted.cameraStatus);
  const [screenStatus, setScreenStatus] = useState(onPermissionsGranted.screenStatus);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  const requestCameraAccess = async () => {
    setCameraStatus('requesting');
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStatus('granted');
      return stream;
    } catch (err) {
      setCameraStatus('denied');
      setError('Camera access denied. Please allow camera access to continue.');
      throw err;
    }
  };

  const requestScreenAccess = async () => {
    setScreenStatus('requesting');
    setError('');
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setScreenStatus('granted');
      return stream;
    } catch (err) {
      setScreenStatus('denied');
      setError('Screen recording denied. Please allow screen recording to continue.');
      throw err;
    }
  };

  const handleSetupPermissions = async () => {
    try {
      const cameraStream = await requestCameraAccess();
      const screenStream = await requestScreenAccess();
      if (cameraStatus === 'granted' && screenStatus === 'granted') {
        onPermissionsGranted({ cameraStream, screenStream });
      }
    } catch (err) {
      console.error('Permission error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-md p-4">
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-400">Grant required permissions to continue</p>
        </div>

        {/* Camera Preview */}
        <div className="mb-6">
          <div className="aspect-video bg-gray-900 rounded-md overflow-hidden mb-4">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Permission Status */}
        <div className="space-y-4 mb-6">
          <div className={`flex items-center justify-between p-4 rounded-lg ${cameraStatus === 'granted' ? 'bg-green-50 dark:bg-green-900/20' : cameraStatus === 'denied' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
            <div className="flex items-center gap-3">
              <Camera size={20} />
              <span className="font-medium">Camera Access</span>
            </div>
            <div className="flex items-center gap-2">
              {cameraStatus === 'granted' && <CheckCircle className="text-green-600" size={20} />}
              {cameraStatus === 'denied' && <AlertTriangle className="text-red-600" size={20} />}
              {cameraStatus === 'requesting' && (<div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />)}
              <span className="text-sm capitalize">{cameraStatus}</span>
            </div>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${screenStatus === 'granted' ? 'bg-green-50 dark:bg-green-900/20' : screenStatus === 'denied' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
            <div className="flex items-center gap-3">
              <Monitor size={20} />
              <span className="font-medium">Screen Recording</span>
            </div>
            <div className="flex items-center gap-2">
              {screenStatus === 'granted' && <CheckCircle className="text-green-600" size={20} />}
              {screenStatus === 'denied' && <AlertTriangle className="text-red-600" size={20} />}
              {screenStatus === 'requesting' && (<div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />)}
              <span className="text-sm capitalize">{screenStatus}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>)}

        {/* Action Button */}
        <button onClick={handleSetupPermissions} disabled={cameraStatus === 'requesting' || screenStatus === 'requesting'} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-semibold text-lg transition-all shadow-lg">
          {cameraStatus === 'granted' && screenStatus === 'granted' ? 'Continue to Assessment' : 'Grant Permissions'}
        </button>
      </div>
    </div>
  );
};

export default ProctoredQuizPage;
