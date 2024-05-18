

export const lineOptions=(limit: number, interval: number)=>{
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--gray-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                    stepSize: Math.round(interval)
                },
                grid: {
                    color: surfaceBorder
                },
                min: 0,
                max: limit,
            }
        }
    };
};

export const pieOptions=()=>{
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '50%',
                    color: textColor
                },
                position: "bottom",
                display: false
            }
        }
    };

};
export const pieData=(labels: string[], data:number[])=>{
    const documentStyle = getComputedStyle(document.body);
    return {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
            }
        ]
    };
};