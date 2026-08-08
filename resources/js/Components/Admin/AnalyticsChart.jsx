import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function AnalyticsChart({ chartData }) {
    const labels = chartData?.labels || ['01 Aug', '02 Aug', '03 Aug', '04 Aug', '05 Aug', '06 Aug', '07 Aug'];
    const viewsData = chartData?.views || [12, 19, 3, 5, 2, 3, 10];
    const visitorsData = chartData?.visitors || [5, 10, 2, 3, 1, 2, 7];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Vues de pages',
                data: viewsData,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                borderWidth: 2.5,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#ffffff',
                pointHoverRadius: 6,
                fill: true,
                tension: 0.35,
            },
            {
                label: 'Visiteurs uniques',
                data: visitorsData,
                borderColor: '#A855F7',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#A855F7',
                pointBorderColor: '#ffffff',
                pointHoverRadius: 6,
                fill: true,
                tension: 0.35,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 11,
                        weight: '600',
                    },
                    color: '#9CA3AF',
                },
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#FFFFFF',
                bodyColor: '#E5E7EB',
                borderColor: '#1F2937',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                titleFont: { size: 12, weight: 'bold' },
                bodyFont: { size: 11 },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6B7280',
                    font: {
                        size: 10,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#6B7280',
                    font: {
                        size: 10,
                    },
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <div className="w-full h-[280px]">
            <Line data={data} options={options} />
        </div>
    );
}
