import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Box3D } from './components/Box3D';
import { Package2 } from 'lucide-react';

function App() {
  const [boxColor, setBoxColor] = useState('#8B4513');
  const [brandName, setBrandName] = useState('BOXOLOGY');

  const colors = [
    { name: 'Classic Cardboard', value: '#8B4513' },
    { name: 'Kraft Paper', value: '#C19A6B' },
    { name: 'Natural Brown', value: '#966F33' },
    { name: 'Dark Brown', value: '#654321' },
    { name: 'Light Kraft', value: '#DEB887' },
    { name: 'Pale Brown', value: '#D2B48C' },
    { name: 'Sandy Brown', value: '#F4A460' },
    { name: 'Rustic Brown', value: '#8B7355' },
    { name: 'Chocolate', value: '#D2691E' },
    { name: 'Coffee Brown', value: '#6F4E37' },
    { name: 'Recycled Gray', value: '#A39480' },
    { name: 'Eco Brown', value: '#BC8F8F' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Package2 className="h-8 w-8 text-amber-700" />
            <h1 className="text-2xl font-bold text-amber-700">boxology.io</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 3D Viewer */}
        <div className="h-[500px] rounded-xl overflow-hidden shadow-lg bg-white">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Suspense fallback={null}>
              <Box3D color={boxColor} brandName={brandName} />
            </Suspense>
            <OrbitControls 
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
            />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Color Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Box Color</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setBoxColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-105 ${
                      boxColor === color.value ? 'border-blue-500 scale-110 shadow-lg' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="sr-only">{color.name}</span>
                    <div
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap ${
                        boxColor === color.value ? 'opacity-100' : ''
                      }`}
                    >
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Selected: {colors.find(c => c.value === boxColor)?.name}
              </p>
            </div>

            {/* Brand Name Input */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Brand Name</h2>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value.toUpperCase())}
                placeholder="Enter brand name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                maxLength={20}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2025 boxology.io - Create your perfect box
        </div>
      </footer>
    </div>
  );
}

export default App;