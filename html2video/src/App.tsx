import html2canvas from "html2canvas";
import { useRef, useState } from "react";

const data = [
  { user: "zhangsan", info: "This is a text message 1" },
  { user: "lisi", info: "This is a text message 2" },
  { user: "wangwu", info: "This is a text message 3" },
  { user: "zhaoliu", info: "This is a text message 4" },
];

function App() {
  const cRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const getCanvasFrames = async () => {
    const frames = [];
    const els = cRef.current!.children;
    for (let i = 0; i < els.length; i++) {
      const frame = await html2canvas(els[i] as HTMLElement, {
        width: 440,
        height: 200,
        scale: 1,
      });
      frames.push(frame);
    }
    return frames;
  };
  const makeVideo = async () => {
    setLoading(true);
    // 搜集每一帧内容
    const frames = await getCanvasFrames();
    // 临时canvas
    const canvas = document.createElement("canvas");
    canvas.width = 440;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    // 则每次画布更改时都会捕获一个新帧
    // 0: frames will not be captured automatically; instead, they will only be captured when the returned track's requestFrame() method is called
    const stream = canvas.captureStream();
    // 创建MediaRecorder实例，用于录制视频
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    // 监听录制过程中的数据可用事件
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    // 监听录制过程中的停止事件
    recorder.onstop = () => {
      setLoading(false);
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      console.log(url);
      const player = document.createElement("video");
      player.src = url;
      player.autoplay = true;
      player.controls = true;
      document.body.appendChild(player);
    };
    // 开始录制
    recorder.start();

    // 逐帧绘制
    for (const frame of frames) {
      ctx?.drawImage(frame, 0, 0, canvas.width, canvas.height);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      // 捕获当前帧
      // (stream.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack).requestFrame();
    }
    // 停止录制
    recorder.stop();
  };
  return (
    <>
      <button onClick={makeVideo}>制作视频</button>
      <br />
      {/* <canvas ref={canvasRef}></canvas> */}
      <div ref={cRef}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <p>
                <strong>{item.user}</strong>:
              </p>
              <p>{item.info}</p>
            </div>
          );
        })}
      </div>
      <p>{loading && "制作中..."}</p>
    </>
  );
}

export default App;
