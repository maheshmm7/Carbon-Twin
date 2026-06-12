// src/components/share/ShareCard.tsx
'use client';

import { useCarbonStore } from '@/store/carbon-store';
import { getAuraDefinition, getAuraColorWithAlpha } from '@/lib/aura-definitions';
import { Share2, Download } from 'lucide-react';
import { useState } from 'react';

export default function ShareCard() {
  const twin = useCarbonStore((state) => state.twin);
  const simulatedScore = useCarbonStore((state) => state.simulator.simulatedScore);
  const simulatedAura = useCarbonStore((state) => state.simulator.simulatedAura);

  const [isExporting, setIsExporting] = useState(false);

  if (!twin) return null;

  const currentScore = simulatedScore > 0 ? simulatedScore : twin.score;
  const currentAura = simulatedScore > 0 ? simulatedAura : twin.aura;
  const auraDef = getAuraDefinition(currentAura);

  const handleDownload = () => {
    setIsExporting(true);

    try {
      // Create off-screen canvas
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Draw Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 600, 400);
      grad.addColorStop(0, '#0a0a0a');
      grad.addColorStop(0.5, '#171717');
      grad.addColorStop(1, '#0f0f15');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 400);

      // Draw Aura Accent Gradient Glow in the corner
      const auraGrad = ctx.createRadialGradient(500, 100, 10, 500, 100, 250);
      auraGrad.addColorStop(0, getAuraColorWithAlpha(auraDef.glowColor, 0.25));
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, 600, 400);

      // Draw border card outlines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(15, 15, 570, 370);

      // Draw title text
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('CARBON TWIN AI / IDENTITY CARD', 40, 50);

      // Draw Aura Badge outline and background
      ctx.fillStyle = getAuraColorWithAlpha(auraDef.glowColor, 0.15);
      ctx.beginPath();
      ctx.roundRect(40, 75, 140, 28, 6);
      ctx.fill();
      ctx.strokeStyle = getAuraColorWithAlpha(auraDef.glowColor, 0.4);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Aura badge text
      ctx.fillStyle = auraDef.glowColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${auraDef.emoji} ${auraDef.name.toUpperCase()}`, 52, 92);

      // Tagline
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`"${auraDef.tagline}"`, 40, 145);

      // Score Info
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('ANNUAL FOOTPRINT SCORE', 40, 200);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'black 64px sans-serif';
      ctx.fillText(currentScore.toFixed(1), 40, 265);

      const scoreWidth = ctx.measureText(currentScore.toFixed(1)).width;
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('tonnes CO₂e', 40 + scoreWidth + 10, 255);

      // Comparative stat
      const relativePercent = Math.round((currentScore / 4.7) * 100);
      ctx.fillStyle = relativePercent <= 100 ? '#10b981' : '#f59e0b';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`${relativePercent}% of the global average footprint`, 40, 305);

      // Footer branding
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = '11px sans-serif';
      ctx.fillText('carbontwin-ai.vercel.app', 40, 350);

      // Create download link
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `carbon-twin-${currentAura}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div 
      id="share-card"
      className="w-full"
    >
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            Share Your Carbon Twin
          </h3>
          <p className="text-sm text-neutral-400">
            Export a high-fidelity digital ID card matching your Aura theme. Show your community your impact and pledge to shift.
          </p>

          {/* HTML Preview card */}
          <div 
            style={{ 
              background: `radial-gradient(circle at 80% 20%, ${getAuraColorWithAlpha(auraDef.glowColor, 0.1)}, transparent), linear-gradient(135deg, #0f0f12, #17171a)` 
            }}
            className="w-full aspect-video md:aspect-[3/2] max-w-md mx-auto rounded-2xl border border-white/10 p-6 flex flex-col justify-between text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                Carbon Twin AI // ID Card
              </span>
              <span className="text-sm">{auraDef.emoji}</span>
            </div>

            <div className="space-y-2">
              <span 
                className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                style={{ 
                  color: auraDef.glowColor, 
                  borderColor: getAuraColorWithAlpha(auraDef.glowColor, 0.4),
                  backgroundColor: getAuraColorWithAlpha(auraDef.glowColor, 0.1)
                }}
              >
                {auraDef.name}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white leading-tight">
                &ldquo;{auraDef.tagline}&rdquo;
              </h4>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Footprint
                </p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-white">
                    {currentScore.toFixed(1)}
                  </span>
                  <span className="text-xs text-neutral-400 font-semibold">tonnes/yr</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Rating
                </p>
                <p className="text-lg font-bold text-green-400 mt-0.5">
                  {Math.round(Math.max(5, 100 - (currentScore * 5)))}/100
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-bold shadow-lg shadow-white/5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting ID Card...' : 'Download Digital ID (PNG)'}
          </button>
        </div>
      </div>
    </div>
  );
}
