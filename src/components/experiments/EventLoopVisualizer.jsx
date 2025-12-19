"use client";

import { useEffect, useRef, useState } from "react";

export default function EventLoopVisualizer() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const [isRunning, setIsRunning] = useState(true);
    const [speed, setSpeed] = useState(1);

    // Queue states
    const callStackRef = useRef([]);
    const taskQueueRef = useRef([]);
    const microtaskQueueRef = useRef([]);
    const webApisRef = useRef([]);

    // Task ID counter
    const taskIdRef = useRef(0);

    const addTask = (type) => {
        const id = ++taskIdRef.current;
        const task = {
            id,
            type,
            name: type === "sync" ? `fn_${id}()` :
                type === "timeout" ? `setTimeout_${id}` :
                    type === "promise" ? `Promise_${id}` :
                        type === "fetch" ? `fetch_${id}` : `task_${id}`,
            progress: 0,
            duration: type === "sync" ? 30 : type === "timeout" ? 100 : type === "promise" ? 20 : 80,
            color: type === "sync" ? "#7C7CFF" :
                type === "timeout" ? "#F59E0B" :
                    type === "promise" ? "#5EEAD4" : "#EC4899",
        };

        if (type === "sync") {
            callStackRef.current.push(task);
        } else if (type === "promise") {
            microtaskQueueRef.current.push(task);
        } else {
            webApisRef.current.push(task);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const drawBox = (x, y, width, height, title, items, maxItems = 6) => {
            // Box background
            ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, 8);
            ctx.fill();
            ctx.stroke();

            // Title
            ctx.fillStyle = "#9CA3AF";
            ctx.font = "bold 11px monospace";
            ctx.textAlign = "center";
            ctx.fillText(title, x + width / 2, y + 20);

            // Items
            const itemHeight = 24;
            const startY = y + 35;
            const itemWidth = width - 16;

            items.slice(0, maxItems).forEach((item, i) => {
                const itemY = startY + i * (itemHeight + 4);

                // Item background
                ctx.fillStyle = item.color + "30";
                ctx.beginPath();
                ctx.roundRect(x + 8, itemY, itemWidth, itemHeight, 4);
                ctx.fill();

                // Progress bar
                if (item.progress < 100) {
                    ctx.fillStyle = item.color + "60";
                    ctx.beginPath();
                    ctx.roundRect(x + 8, itemY, itemWidth * (item.progress / 100), itemHeight, 4);
                    ctx.fill();
                }

                // Item text
                ctx.fillStyle = "#E5E7EB";
                ctx.font = "10px monospace";
                ctx.textAlign = "left";
                ctx.fillText(item.name, x + 14, itemY + 15);
            });

            // Overflow indicator
            if (items.length > maxItems) {
                ctx.fillStyle = "#6B7280";
                ctx.font = "10px monospace";
                ctx.textAlign = "center";
                ctx.fillText(`+${items.length - maxItems} more`, x + width / 2, y + height - 10);
            }
        };

        const drawArrow = (x1, y1, x2, y2, label = "") => {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Arrow head
            const angle = Math.atan2(y2 - y1, x2 - x1);
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - 8 * Math.cos(angle - Math.PI / 6), y2 - 8 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(x2 - 8 * Math.cos(angle + Math.PI / 6), y2 - 8 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fill();

            if (label) {
                ctx.fillStyle = "#6B7280";
                ctx.font = "9px monospace";
                ctx.textAlign = "center";
                ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 5);
            }
        };

        const animate = () => {
            if (!isRunning) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Clear
            ctx.fillStyle = "#0B0D10";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const boxWidth = 160;
            const boxHeight = 200;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Update progress and move items
            webApisRef.current.forEach(item => {
                item.progress += speed * 1.5;
                if (item.progress >= 100) {
                    if (item.type === "promise") {
                        microtaskQueueRef.current.push({ ...item, progress: 0 });
                    } else {
                        taskQueueRef.current.push({ ...item, progress: 0 });
                    }
                }
            });
            webApisRef.current = webApisRef.current.filter(item => item.progress < 100);

            // Process call stack
            if (callStackRef.current.length > 0) {
                const top = callStackRef.current[callStackRef.current.length - 1];
                top.progress += speed * 3;
                if (top.progress >= 100) {
                    callStackRef.current.pop();
                }
            } else {
                // Process microtasks first (event loop behavior)
                if (microtaskQueueRef.current.length > 0) {
                    const task = microtaskQueueRef.current.shift();
                    callStackRef.current.push({ ...task, progress: 0 });
                } else if (taskQueueRef.current.length > 0) {
                    // Then process macro tasks
                    const task = taskQueueRef.current.shift();
                    callStackRef.current.push({ ...task, progress: 0 });
                }
            }

            // Draw boxes
            drawBox(centerX - boxWidth / 2, 30, boxWidth, boxHeight, "CALL STACK", callStackRef.current);
            drawBox(30, centerY - boxHeight / 2, boxWidth, boxHeight, "WEB APIs", webApisRef.current);
            drawBox(canvas.width - boxWidth - 30, centerY - boxHeight / 2, boxWidth, boxHeight, "MICROTASK QUEUE", microtaskQueueRef.current);
            drawBox(centerX - boxWidth / 2, canvas.height - boxHeight - 30, boxWidth, boxHeight, "TASK QUEUE", taskQueueRef.current);

            // Draw arrows
            drawArrow(centerX - boxWidth / 2 - 10, 130, 30 + boxWidth + 10, centerY - 20, "async");
            drawArrow(30 + boxWidth + 10, centerY + 20, centerX - boxWidth / 2 - 10, canvas.height - boxHeight - 40, "callback");
            drawArrow(centerX + boxWidth / 2 + 10, canvas.height - boxHeight, canvas.width - boxWidth - 40, centerY + boxHeight / 2, "microtask");
            drawArrow(canvas.width - boxWidth - 40, centerY - boxHeight / 2 + 20, centerX + boxWidth / 2 + 10, 50, "execute");

            // Event loop indicator
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
            ctx.strokeStyle = "#5EEAD4";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = "#5EEAD4";
            ctx.font = "bold 10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("EVENT", centerX, centerY - 5);
            ctx.fillText("LOOP", centerX, centerY + 8);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [isRunning, speed]);

    return (
        <div className="w-full h-full flex flex-col">
            <canvas ref={canvasRef} className="flex-1 w-full" />
            <div className="flex flex-wrap gap-3 p-4 border-t border-white/5">
                <button
                    onClick={() => addTask("sync")}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-[#7C7CFF]/20 text-[#7C7CFF] border border-[#7C7CFF]/30 hover:bg-[#7C7CFF]/30 transition-all"
                >
                    + Sync Function
                </button>
                <button
                    onClick={() => addTask("timeout")}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 hover:bg-[#F59E0B]/30 transition-all"
                >
                    + setTimeout
                </button>
                <button
                    onClick={() => addTask("promise")}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-[#5EEAD4]/20 text-[#5EEAD4] border border-[#5EEAD4]/30 hover:bg-[#5EEAD4]/30 transition-all"
                >
                    + Promise
                </button>
                <button
                    onClick={() => addTask("fetch")}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/30 hover:bg-[#EC4899]/30 transition-all"
                >
                    + Fetch
                </button>
                <div className="flex-1" />
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${isRunning ? "bg-accent/20 text-accent" : "bg-white/5 text-secondary"
                        }`}
                >
                    {isRunning ? "⏸ Pause" : "▶ Play"}
                </button>
                <select
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-white/5 text-secondary border border-white/10"
                >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={4}>4x</option>
                </select>
            </div>
        </div>
    );
}
