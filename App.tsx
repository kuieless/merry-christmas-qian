import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { GestureType, Vector3 } from './types';
import { IMAGES } from './constants';

// 动态导入组件以避免初始加载问题
const Experience = React.lazy(() => import('./components/Experience'));
const PhotoModal = React.lazy(() => import('./components/PhotoModal'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [gesture, setGesture] = useState<GestureType>(GestureType.NONE);
  const [handPos, setHandPos] = useState<Vector3>([0, 0, 0]);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number>(0);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  // Preload Images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = IMAGES.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        });
        
        await Promise.all(imagePromises);
        console.log('✅ Images preloaded successfully');
      } catch (e) {
        console.warn('⚠️ Some images failed to preload:', e);
      }
    };
    
    preloadImages();
  }, []);

  // Setup MediaPipe
  useEffect(() => {
    const setup = async () => {
      try {
        console.log('🔄 Initializing MediaPipe...');
        
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        
        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        
        console.log('✅ MediaPipe initialized successfully');
        setLoading(false);
        setMediaLoaded(true);
        startCamera();
        
      } catch (e) {
        console.error("❌ Failed to load MediaPipe:", e);
        setError("MediaPipe 初始化失败，但 3D 场景仍可使用");
        setLoading(false);
        setMediaLoaded(true);
        setGesture(GestureType.FIST); // 默认显示树
      }
    };
    
    setup();
  }, []);

  const startCamera = async () => {
    if (!videoRef.current) return;
    
    try {
      console.log('📷 Requesting camera access...');
      
      // 检测设备类型
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const constraints = {
        video: {
          width: { ideal: isMobile ? 480 : 640 },
          height: { ideal: isMobile ? 640 : 480 },
          facingMode: isMobile ? 'user' : 'user', // 前置摄像头
          frameRate: { ideal: 15, max: 30 } // 降低帧率以提高性能
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', predictWebcam);
      console.log('✅ Camera started successfully');
      
    } catch(err) {
      console.error("❌ Camera access denied:", err);
      setCameraError("摄像头访问被拒绝，手势功能不可用");
      setGesture(GestureType.FIST); // 默认显示树
    }
  };

  const predictWebcam = () => {
    if (!landmarkerRef.current || !videoRef.current) return;
    
    const startTimeMs = performance.now();
    if (videoRef.current.currentTime > 0) {
       try {
         const result = landmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);
         
         if (result.landmarks && result.landmarks.length > 0) {
           const landmarks = result.landmarks[0];
           
           // Hand position for subtle parallax
           const cx = landmarks[9].x; 
           const cy = landmarks[9].y;
           setHandPos([-(cx - 0.5) * 2, -(cy - 0.5) * 2, 0]);

           // Gesture detection logic
           const thumbTip = landmarks[4];
           const indexTip = landmarks[8];
           const middleTip = landmarks[12];
           const ringTip = landmarks[16];
           const pinkyTip = landmarks[20];
           
           const isIndexUp = indexTip.y < landmarks[6].y;
           const isMiddleUp = middleTip.y < landmarks[10].y;
           const isRingUp = ringTip.y < landmarks[14].y;
           const isPinkyUp = pinkyTip.y < landmarks[18].y;

           // Check if at least 4 fingers are up/extended to consider it "Open Palm"
           const openFingers = [isIndexUp, isMiddleUp, isRingUp, isPinkyUp].filter(Boolean).length;

           if (openFingers >= 4) {
              setGesture(GestureType.OPEN_PALM);
           } else {
              setGesture(GestureType.FIST);
           }

         } else {
           setGesture(GestureType.FIST); // Default to tree if no hand detected
         }
       } catch (e) {
         console.warn('Hand detection error:', e);
       }
    }
    
    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 触摸交互处理
  const handleTouchInteraction = () => {
    if (isMobile && (cameraError || !landmarkerRef.current)) {
      setTouchMode(true);
      setGesture(gesture === GestureType.OPEN_PALM ? GestureType.FIST : GestureType.OPEN_PALM);
    }
  };

  if (error && !mediaLoaded) {
    return (
      <div 
          className="w-full h-screen relative text-white overflow-hidden flex items-center justify-center"
          style={{
              background: 'radial-gradient(circle at 50% 50%, #003024 0%, #001510 40%, #000000 100%)'
          }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            ❌ 加载错误
          </h1>
          <p className="text-xl text-white mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
        className="w-full h-screen relative text-white overflow-hidden"
        style={{
            background: 'radial-gradient(circle at 50% 50%, #003024 0%, #001510 40%, #000000 100%)'
        }}
        onClick={handleTouchInteraction}
        onTouchStart={handleTouchInteraction}
    >
      {/* 横屏警告 */}
      {isMobile && (
        <div className="landscape-warning absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">📱</div>
            <div className="text-xl text-yellow-500 mb-2">请竖屏使用</div>
            <div className="text-sm text-gray-300">为了最佳体验，请将手机竖直放置</div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay playsInline className="absolute opacity-0 pointer-events-none w-1 h-1" />

      {/* Pre-cached images hidden in DOM */}
      <div className="hidden">
        {IMAGES.map(src => <img key={src} src={src} alt="preload" />)}
      </div>

      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#00100c] p-4">
           <div className="text-2xl md:text-4xl text-yellow-500 animate-pulse tracking-widest text-center">
              🎄 MERRY CHRISTMAS 🎄
           </div>
           <div className="mt-4 text-emerald-500 italic text-center">正在种植魔法...</div>
           <div className="mt-8 text-xs md:text-sm text-gray-400 space-y-1 text-center">
             <p>✅ 加载 React 组件</p>
             <p>✅ 预加载图片资源</p>
             <p>🔄 初始化手势识别</p>
             {isMobile && <p>📱 优化移动端体验</p>}
             <p>🔄 启动摄像头</p>
           </div>
        </div>
      )}

      {!loading && mediaLoaded && (
        <React.Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-yellow-500">加载 3D 场景...</div>
          </div>
        }>
          <Experience gesture={gesture} handPosition={handPos} />
          <PhotoModal gesture={gesture} />
        </React.Suspense>
      )}

      {/* 摄像头错误提示 */}
      {cameraError && (
        <div className="absolute top-4 left-4 right-4 bg-yellow-900/80 backdrop-blur-md p-3 md:p-4 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-200 text-xs md:text-sm">
            ⚠️ {cameraError}
          </p>
          <p className="text-yellow-300 text-xs mt-1">
            {isMobile ? "点击屏幕切换效果" : "你仍然可以欣赏 3D 圣诞树场景"}
          </p>
        </div>
      )}

      {/* MediaPipe 错误提示 */}
      {error && mediaLoaded && (
        <div className="absolute top-4 left-4 right-4 bg-orange-900/80 backdrop-blur-md p-3 md:p-4 rounded-lg border border-orange-500/30">
          <p className="text-orange-200 text-xs md:text-sm">
            ⚠️ {error}
          </p>
        </div>
      )}

      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 text-center pointer-events-none transition-opacity duration-500 px-4">
          <div className="inline-block bg-black/40 backdrop-blur-md px-4 md:px-8 py-2 md:py-3 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
             <p className="text-yellow-100 text-xs md:text-sm tracking-[0.2em] uppercase">
                {gesture === GestureType.OPEN_PALM 
                    ? "✧ Revealing Memory ✧" 
                    : "✧ Merry Christmas Qian ✧"}
             </p>
             {!cameraError && landmarkerRef.current && !isMobile && (
               <p className="text-emerald-300 text-xs mt-1">
                 👋 挥手展开手掌查看照片
               </p>
             )}
             {isMobile && (cameraError || touchMode) && (
               <p className="text-emerald-300 text-xs mt-1">
                 👆 点击屏幕切换效果
               </p>
             )}
             {isMobile && !cameraError && !touchMode && (
               <p className="text-emerald-300 text-xs mt-1">
                 📱 对着前置摄像头挥手
               </p>
             )}
          </div>
      </div>
      
      {/* Subtle overlay to blend edges nicely */}
      <div className="absolute inset-0 pointer-events-none border-[30px] border-black/20 opacity-80" 
           style={{boxShadow: 'inset 0 0 150px #000'}}></div>
    </div>
  );
};

export default App;