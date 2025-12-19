"use client";

import { useEffect, useRef, useState } from "react";

class Packet {
    constructor(startNode, endNode, type, path) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.type = type; // request, response, data, error
        this.path = path;
        this.progress = 0;
        this.speed = 0.015 + Math.random() * 0.01;
        this.color = type === "request" ? "#7C7CFF" :
            type === "response" ? "#5EEAD4" :
                type === "data" ? "#F59E0B" : "#EF4444";
        this.size = type === "data" ? 8 : 5;
    }

    update() {
        this.progress += this.speed;
        return this.progress >= 1;
    }

    getPosition() {
        const t = this.progress;
        const p = this.path;

        // Bezier curve interpolation
        if (p.length === 2) {
            return {
                x: p[0].x + (p[1].x - p[0].x) * t,
                y: p[0].y + (p[1].y - p[0].y) * t,
            };
        } else if (p.length === 3) {
            const t1 = 1 - t;
            return {
                x: t1 * t1 * p[0].x + 2 * t1 * t * p[1].x + t * t * p[2].x,
                y: t1 * t1 * p[0].y + 2 * t1 * t * p[1].y + t * t * p[2].y,
            };
        }
        return p[0];
    }

    draw(ctx) {
        const pos = this.getPosition();

        // Glow
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, this.size * 3);
        gradient.addColorStop(0, this.color + "60");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(pos.x - this.size * 3, pos.y - this.size * 3, this.size * 6, this.size * 6);

        // Packet
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default function NetworkPacketFlow() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const packetsRef = useRef([]);

    const [isRunning, setIsRunning] = useState(true);
    const [trafficLevel, setTrafficLevel] = useState("normal"); // low, normal, high, burst
    const [stats, setStats] = useState({ sent: 0, received: 0, dropped: 0 });

    // Network nodes
    const nodesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Define nodes based on canvas size
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            nodesRef.current = [
                { id: "client", x: 80, y: cy, label: "Client", icon: "💻", connections: ["firewall"] },
                { id: "firewall", x: cx * 0.5, y: cy, label: "Firewall", icon: "🛡️", connections: ["loadbalancer"] },
                { id: "loadbalancer", x: cx, y: cy - 60, label: "Load Balancer", icon: "⚖️", connections: ["server1", "server2"] },
                { id: "server1", x: cx + 100, y: cy - 100, label: "Server 1", icon: "🖥️", connections: ["database"] },
                { id: "server2", x: cx + 100, y: cy + 40, label: "Server 2", icon: "🖥️", connections: ["database", "cache"] },
                { id: "database", x: canvas.width - 100, y: cy - 40, label: "Database", icon: "🗄️", connections: [] },
                { id: "cache", x: canvas.width - 100, y: cy + 80, label: "Cache", icon: "⚡", connections: [] },
            ];
        };
        resize();
        window.addEventListener("resize", resize);

        const getNode = (id) => nodesRef.current.find(n => n.id === id);

        const sendPacket = (fromId, toId, type) => {
            const from = getNode(fromId);
            const to = getNode(toId);
            if (!from || !to) return;

            // Create curved path
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 + (Math.random() - 0.5) * 40;

            packetsRef.current.push(new Packet(fromId, toId, type, [
                { x: from.x, y: from.y },
                { x: midX, y: midY },
                { x: to.x, y: to.y },
            ]));

            setStats(prev => ({ ...prev, sent: prev.sent + 1 }));
        };

        const drawNode = (node) => {
            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Icon
            ctx.font = "20px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(node.icon, node.x, node.y + 7);

            // Label
            ctx.font = "10px monospace";
            ctx.fillStyle = "#9CA3AF";
            ctx.fillText(node.label, node.x, node.y + 45);
        };

        const drawConnection = (from, to) => {
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        };

        let spawnTimer = 0;

        const animate = () => {
            // Clear
            ctx.fillStyle = "#0B0D10";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            nodesRef.current.forEach(node => {
                node.connections.forEach(connId => {
                    const connNode = getNode(connId);
                    if (connNode) drawConnection(node, connNode);
                });
            });

            // Draw nodes
            nodesRef.current.forEach(drawNode);

            if (isRunning) {
                // Spawn packets based on traffic level
                spawnTimer++;
                const spawnRate = trafficLevel === "low" ? 60 :
                    trafficLevel === "normal" ? 30 :
                        trafficLevel === "high" ? 15 : 5;

                if (spawnTimer >= spawnRate) {
                    spawnTimer = 0;

                    // Random packet flow
                    const flows = [
                        ["client", "firewall", "request"],
                        ["firewall", "loadbalancer", "request"],
                        ["loadbalancer", "server1", "request"],
                        ["loadbalancer", "server2", "request"],
                        ["server1", "database", "data"],
                        ["server2", "cache", "data"],
                        ["server2", "database", "data"],
                        ["database", "server1", "response"],
                        ["cache", "server2", "response"],
                        ["server1", "loadbalancer", "response"],
                        ["server2", "loadbalancer", "response"],
                        ["loadbalancer", "firewall", "response"],
                        ["firewall", "client", "response"],
                    ];

                    const flow = flows[Math.floor(Math.random() * flows.length)];
                    sendPacket(flow[0], flow[1], flow[2]);

                    // Occasional error packets
                    if (Math.random() > 0.95) {
                        sendPacket("firewall", "client", "error");
                        setStats(prev => ({ ...prev, dropped: prev.dropped + 1 }));
                    }
                }

                // Update packets
                packetsRef.current = packetsRef.current.filter(packet => {
                    const done = packet.update();
                    if (done) {
                        setStats(prev => ({ ...prev, received: prev.received + 1 }));
                    }
                    return !done;
                });
            }

            // Draw packets
            packetsRef.current.forEach(packet => packet.draw(ctx));

            // Legend
            const legendY = 20;
            const legends = [
                { color: "#7C7CFF", label: "Request" },
                { color: "#5EEAD4", label: "Response" },
                { color: "#F59E0B", label: "Data" },
                { color: "#EF4444", label: "Error" },
            ];

            ctx.font = "10px monospace";
            legends.forEach((leg, i) => {
                ctx.beginPath();
                ctx.arc(20, legendY + i * 18, 4, 0, Math.PI * 2);
                ctx.fillStyle = leg.color;
                ctx.fill();
                ctx.fillStyle = "#9CA3AF";
                ctx.textAlign = "left";
                ctx.fillText(leg.label, 30, legendY + i * 18 + 4);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [isRunning, trafficLevel]);

    return (
        <div className="w-full h-full flex flex-col">
            <canvas ref={canvasRef} className="flex-1 w-full" />
            <div className="flex flex-wrap items-center gap-4 p-4 border-t border-white/5">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${isRunning ? "bg-accent/20 text-accent" : "bg-white/5 text-secondary"
                        }`}
                >
                    {isRunning ? "⏸ Pause" : "▶ Play"}
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary">Traffic:</span>
                    {["low", "normal", "high", "burst"].map(level => (
                        <button
                            key={level}
                            onClick={() => setTrafficLevel(level)}
                            className={`px-2 py-1 text-xs font-medium rounded transition-all ${trafficLevel === level
                                    ? "bg-accent text-background"
                                    : "bg-white/5 text-secondary hover:bg-white/10"
                                }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#7C7CFF]">Sent: {stats.sent}</span>
                    <span className="text-[#5EEAD4]">Received: {stats.received}</span>
                    <span className="text-[#EF4444]">Dropped: {stats.dropped}</span>
                </div>
            </div>
        </div>
    );
}
