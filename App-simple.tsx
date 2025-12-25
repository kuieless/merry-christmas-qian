import React from 'react';

const App: React.FC = () => {
  return (
    <div 
        className="w-full h-screen relative text-white overflow-hidden flex items-center justify-center"
        style={{
            background: 'radial-gradient(circle at 50% 50%, #003024 0%, #001510 40%, #000000 100%)'
        }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">
          🎄 Merry Christmas Qian 🎄
        </h1>
        <p className="text-2xl text-emerald-400">
          项目正在加载中...
        </p>
        <div className="mt-8 text-lg text-white">
          <p>✅ React 渲染正常</p>
          <p>✅ CSS 样式正常</p>
          <p>✅ Tailwind CSS 正常</p>
        </div>
      </div>
    </div>
  );
};

export default App;