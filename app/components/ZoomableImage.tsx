"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export const previewImageSizes = "(max-width: 768px) 180vw, 1200px";

type Point = { x: number; y: number };
type View = Point & { scale: number };
const initialView: View = { x: 0, y: 0, scale: 1 };

export default function ZoomableImage({ src, alt, onPrevious, onNext }: {
  src: string; alt: string; onPrevious: () => void; onNext: () => void;
}) {

  const frame = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const swipe = useRef<Point | null>(null);
  const viewRef = useRef(initialView);
  const [view, setView] = useState(initialView);

  const update = (next: View) => {
    const rect = frame.current?.getBoundingClientRect();
    const scale = Math.min(4, Math.max(1, next.scale));
    const maxX = (rect?.width ?? 0) * (scale - 1) / 2;
    const maxY = (rect?.height ?? 0) * (scale - 1) / 2;
    viewRef.current = { scale, x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)) };
    setView(viewRef.current);
  };

  return (
    <div
      ref={frame}
      className="relative overflow-hidden rounded-xl touch-none select-none"
      style={{ cursor: view.scale > 1 ? "grab" : "default" }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const point = { x: event.clientX, y: event.clientY };
        pointers.current.set(event.pointerId, point);
        swipe.current = pointers.current.size === 1 && viewRef.current.scale === 1 ? point : null;
      }}
      onPointerMove={(event) => {
        const previous = pointers.current.get(event.pointerId);
        if (!previous) return;
        const before = Array.from(pointers.current.values());
        const point = { x: event.clientX, y: event.clientY };
        pointers.current.set(event.pointerId, point);
        const current = viewRef.current;
        if (pointers.current.size === 2) {
          const after = Array.from(pointers.current.values());
          const distance = (points: Point[]) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
          const oldDistance = distance(before);
          if (oldDistance < 1) return;
          const scale = Math.min(4, Math.max(1, current.scale * distance(after) / oldDistance));
          const rect = event.currentTarget.getBoundingClientRect();
          const oldCenter = { x: (before[0].x + before[1].x) / 2 - rect.left - rect.width / 2, y: (before[0].y + before[1].y) / 2 - rect.top - rect.height / 2 };
          const newCenter = { x: (after[0].x + after[1].x) / 2 - rect.left - rect.width / 2, y: (after[0].y + after[1].y) / 2 - rect.top - rect.height / 2 };
          update({ scale, x: newCenter.x - (oldCenter.x - current.x) * scale / current.scale, y: newCenter.y - (oldCenter.y - current.y) * scale / current.scale });
        } else if (pointers.current.size === 1 && current.scale > 1) {
          update({ ...current, x: current.x + point.x - previous.x, y: current.y + point.y - previous.y });
        }
      }}
      onPointerUp={(event) => {
        const start = swipe.current;
        pointers.current.delete(event.pointerId);
        swipe.current = null;
        if (!start || pointers.current.size || viewRef.current.scale !== 1) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) onNext(); else onPrevious();
        }
      }}
      onPointerCancel={() => { pointers.current.clear(); swipe.current = null; }}
      onLostPointerCapture={(event) => { pointers.current.delete(event.pointerId); swipe.current = null; }}
    >
      <Image src={src} alt={alt} width={1200} height={900} sizes={previewImageSizes} loading="eager" fetchPriority="high" draggable={false}
        className="max-h-[70dvh] w-auto max-w-[90vw] object-contain"
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }} />
    </div>
  );
}
