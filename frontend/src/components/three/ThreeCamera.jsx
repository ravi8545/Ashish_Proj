import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';

/**
 * Stylized cinema camera built from primitives — no external GLTF needed.
 * Slowly auto-rotates, with subtle pointer-driven parallax tilt.
 * Responsive: smaller scale + pulled-back camera on mobile so the model
 * fits nicely on Android / small viewports.
 */
function CameraModel({ pointer, scale = 1.1 }) {
  const root = useRef();

  useFrame((state, delta) => {
    if (!root.current) return;
    // slow continuous rotation around Y
    root.current.rotation.y += delta * 0.18;

    // subtle parallax: tilt towards mouse (pointer is normalized -1..1)
    const targetX = pointer.current.y * 0.25;
    const targetZ = pointer.current.x * 0.15;
    root.current.rotation.x += (targetX - root.current.rotation.x) * 0.06;
    root.current.rotation.z += (targetZ - root.current.rotation.z) * 0.06;
  });

  // Refined materials — premium gold / charcoal
  const bodyMat = (
    <meshStandardMaterial
      color="#15161c"
      metalness={0.85}
      roughness={0.32}
    />
  );
  const accentMat = (
    <meshStandardMaterial
      color="#d4a574"
      metalness={0.7}
      roughness={0.22}
      emissive="#d4a574"
      emissiveIntensity={0.55}
    />
  );
  const glassMat = (
    <meshStandardMaterial
      color="#08090d"
      metalness={1}
      roughness={0.05}
      envMapIntensity={1.3}
    />
  );
  const ringMat = (
    <meshStandardMaterial color="#1f2029" metalness={0.95} roughness={0.28} />
  );

  return (
    <group ref={root} scale={scale}>
      {/* main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.4, 1.3]} />
        {bodyMat}
      </mesh>
      {/* grip */}
      <mesh position={[1.05, -0.1, 0]} castShadow>
        <boxGeometry args={[0.35, 1.15, 1.25]} />
        {bodyMat}
      </mesh>
      {/* viewfinder bump on top */}
      <mesh position={[-0.25, 0.85, 0]} castShadow>
        <boxGeometry args={[0.7, 0.35, 0.85]} />
        {bodyMat}
      </mesh>
      {/* hot shoe */}
      <mesh position={[0.35, 0.78, 0]}>
        <boxGeometry args={[0.45, 0.12, 0.4]} />
        {bodyMat}
      </mesh>

      {/* lens barrel — front */}
      <group position={[0, -0.05, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.62, 0.62, 1.2, 48]} />
          {bodyMat}
        </mesh>
        {/* lens accent rings */}
        <mesh position={[0, -0.62, 0]}>
          <torusGeometry args={[0.62, 0.045, 16, 64]} />
          {accentMat}
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <torusGeometry args={[0.66, 0.03, 16, 64]} />
          {ringMat}
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.66, 0.025, 16, 64]} />
          {ringMat}
        </mesh>
        {/* glass element */}
        <mesh position={[0, -0.62, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 48]} />
          {glassMat}
        </mesh>
        {/* inner reflection disk */}
        <mesh position={[0, -0.66, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.02, 48]} />
          <meshStandardMaterial
            color="#d4a574"
            emissive="#d4a574"
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* record button */}
      <mesh position={[0.85, 0.5, 0.66]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
        {accentMat}
      </mesh>

      {/* dial */}
      <mesh position={[0.4, 0.5, -0.66]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.1, 24]} />
        <meshStandardMaterial color="#1a1b22" metalness={0.85} roughness={0.5} />
      </mesh>

      {/* brand stripe */}
      <mesh position={[-0.4, -0.55, 0.66]}>
        <boxGeometry args={[1.0, 0.06, 0.005]} />
        {accentMat}
      </mesh>
    </group>
  );
}

function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'lg';
    const w = window.innerWidth;
    return w < 480 ? 'xs' : w < 768 ? 'sm' : w < 1024 ? 'md' : 'lg';
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
}

export default function ThreeCamera({ className = '' }) {
  // pointer ref drives parallax without re-rendering React
  const pointer = useRef({ x: 0, y: 0 });
  const bp = useBreakpoint();

  // Tune model scale and camera position per breakpoint so it fits nicely
  // on mobile (Android / iOS) without being clipped or feeling oversized.
  const config = {
    xs: { scale: 0.62, camPos: [0, 0.15, 7.2], fov: 42 },
    sm: { scale: 0.78, camPos: [0, 0.18, 6.4], fov: 40 },
    md: { scale: 0.95, camPos: [0, 0.2, 5.6], fov: 38 },
    lg: { scale: 1.1, camPos: [0, 0.2, 5.2], fov: 38 },
  }[bp];

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const onPointerLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Canvas
        camera={{ position: config.camPos, fov: config.fov }}
        dpr={[1, bp === 'xs' || bp === 'sm' ? 1.4 : 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows={false}
      >
        {/* Cinematic three-point lighting tinted to the warm-gold palette */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#fff7ea" />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#d4a574" />
        <pointLight position={[0, -3, 4]} intensity={0.55} color="#e8c598" />
        <pointLight position={[3, 3, -2]} intensity={0.4} color="#7dd3c0" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.7}>
            <CameraModel pointer={pointer} scale={config.scale} />
          </Float>
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.45}
            scale={8}
            blur={2.4}
            far={4}
            color="#000000"
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}
