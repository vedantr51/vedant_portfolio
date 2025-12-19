"use client";

import { useEffect, useRef, useState } from "react";

export default function SystemLoadSimulator() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const [cpuLoad, setCpuLoad] = useState(30);
    const [memoryLoad, setMemoryLoad] = useState(45);
    const [networkLoad, setNetworkLoad] = useState(20);
    const [isRunning, setIsRunning] = useState(true);
    const [showSpikes, setShowSpikes] = useState(false);

    // Historical data for graphs
    const historyRef = useRef({
        cpu: Array(100).fill(30),
        memory: Array(100).fill(45),
        network: Array(100).fill(20),
    });

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

        let time = 0;

        const animate = () => {
            if (!isRunning) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            time += 0.02;

            // Simulate load variations
            const cpuVariation = Math.sin(time * 0.5) * 10 + Math.random() * 8 - 4 + (showSpikes && Math.random() > 0.95 ? 40 : 0);
            const memVariation = Math.sin(time * 0.3) * 5 + Math.random() * 3 - 1.5;
            const netVariation = Math.sin(time * 0.8) * 15 + Math.random() * 12 - 6 + (showSpikes && Math.random() > 0.9 ? 50 : 0);

            const newCpu = Math.max(5, Math.min(100, cpuLoad + cpuVariation * 0.1));
            const newMem = Math.max(10, Math.min(95, memoryLoad + memVariation * 0.05));
            const newNet = Math.max(0, Math.min(100, networkLoad + netVariation * 0.15));

            setCpuLoad(newCpu);
            setMemoryLoad(newMem);
            setNetworkLoad(newNet);

            // Update history
            historyRef.current.cpu.push(newCpu);
            historyRef.current.cpu.shift();
            historyRef.current.memory.push(newMem);
            historyRef.current.memory.shift();
            historyRef.current.network.push(newNet);
            historyRef.current.network.shift();

            // Draw
            ctx.fillStyle = "#0B0D10";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const graphHeight = (canvas.height - 80) / 3;
            const graphWidth = canvas.width - 140;
            const startX = 120;

            // Draw each metric
            const metrics = [
                { name: "CPU", data: historyRef.current.cpu, color: "#7C7CFF", value: newCpu },
                { name: "Memory", data: historyRef.current.memory, color: "#5EEAD4", value: newMem },
                { name: "Network", data: historyRef.current.network, color: "#F59E0B", value: newNet },
            ];

            metrics.forEach((metric, idx) => {
                const y = 30 + idx * (graphHeight + 10);

                // Label
                ctx.fillStyle = "#9CA3AF";
                ctx.font = "12px monospace";
                ctx.textAlign = "right";
                ctx.fillText(metric.name, 100, y + graphHeight / 2 + 4);

                // Value
                ctx.fillStyle = metric.color;
                ctx.font = "bold 14px monospace";
                ctx.textAlign = "right";
                ctx.fillText(`${Math.round(metric.value)}%`, 100, y + graphHeight / 2 + 22);

                // Graph background
                ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
                ctx.fillRect(startX, y, graphWidth, graphHeight);

                // Grid lines
                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                ctx.lineWidth = 1;
                for (let i = 0; i <= 4; i++) {
                    const gridY = y + (graphHeight / 4) * i;
                    ctx.beginPath();
                    ctx.moveTo(startX, gridY);
                    ctx.lineTo(startX + graphWidth, gridY);
                    ctx.stroke();
                }

                // Draw line graph
                ctx.beginPath();
                ctx.strokeStyle = metric.color;
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

                metric.data.forEach((value, i) => {
                    const x = startX + (i / (metric.data.length - 1)) * graphWidth;
                    const plotY = y + graphHeight - (value / 100) * graphHeight;
                    if (i === 0) ctx.moveTo(x, plotY);
                    else ctx.lineTo(x, plotY);
                });
                ctx.stroke();

                // Fill under curve
                ctx.lineTo(startX + graphWidth, y + graphHeight);
                ctx.lineTo(startX, y + graphHeight);
                ctx.closePath();
                ctx.fillStyle = metric.color.replace(")", ", 0.1)").replace("rgb", "rgba");
                ctx.fill();

                // Current value indicator
                const currentX = startX + graphWidth;
                const currentY = y + graphHeight - (metric.value / 100) * graphHeight;
                ctx.beginPath();
                ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
                ctx.fillStyle = metric.color;
                ctx.fill();

                // Glow on high values
                if (metric.value > 80) {
                    ctx.beginPath();
                    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
                    ctx.fillStyle = metric.color.replace(")", ", 0.3)").replace("rgb", "rgba");
                    ctx.fill();
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [cpuLoad, memoryLoad, networkLoad, isRunning, showSpikes]);

    return (
        <div className="w-full h-full flex flex-col">
            <canvas ref={canvasRef} className="flex-1 w-full" />
            <div className="flex gap-4 p-4 border-t border-white/5">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isRunning
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : "bg-white/5 text-secondary"
                        }`}
                >
                    {isRunning ? "⏸ Pause" : "▶ Resume"}
                </button>
                <button
                    onClick={() => setShowSpikes(!showSpikes)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${showSpikes
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-white/5 text-secondary"
                        }`}
                >
                    {showSpikes ? "🔥 Spikes On" : "Spikes Off"}
                </button>
                <button
                    onClick={() => {
                        setCpuLoad(90);
                        setMemoryLoad(85);
                        setNetworkLoad(95);
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                    ⚠️ Simulate High Load
                </button>
            </div>
        </div>
    );
}
