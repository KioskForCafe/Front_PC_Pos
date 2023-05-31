import { Box, Card, CardContent, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'

interface saleListBytime {
    time: number,
    saleAmount: number,
    saleCount: number
}

interface props {
    byTime: saleListBytime[];
}


export default function AnalysisBusinessDetail({ byTime }: props) {

    let sorted = byTime.sort((a, b) => a.time - b.time);
    const [sortedTime, setSortedTime] = useState<saleListBytime[]>(sorted);

    const completeData = Array.from({ length: 24 }, (_, i) => i).map((hour) => {
        const foundData = sortedTime.find((data) => data.time === hour);
        if (foundData) {
            return foundData;
        } else {
            return {
                time: hour,
                saleAmount: 0,
                saleCount: 0,
            };
        }
    });

    const saleData = [{
        id: "매출",
        color: "hsl(295, 70%, 50%)",
        data: completeData.map((sale) => ({
            x: sale.time + '시',
            y: sale.saleAmount
        }
        ))
    }
    ];

    const countData = [
        {
            id: "건수",
            color : "hsl(83, 70%, 50%)",
            data: completeData.map((sale) => ({
                x: sale.time + '시',
                y: sale.saleCount
            }))
        }
    ]


    const SaleLineChart = (saleData: any) => (
        <ResponsiveLine
            data={saleData}
            margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '매출액',
                legendOffset: -55,
                legendPosition: 'middle'
            }}
            colors={['#ff9933']}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );

    const CountLineChart = (countData: any) => (
        <ResponsiveLine
            data={countData}
            margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '건수',
                legendOffset: -55,
                legendPosition: 'middle'
            }}
            colors={['#44bb80']}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );

    const sortedBySaleCount = byTime.sort((a, b) => b.saleCount - a.saleCount);



    useEffect(() => {
        sorted = byTime.sort((a, b) => b.time - a.time);
        setSortedTime(sorted);
    }, [byTime])

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >주문이 많이 들어온 시간대</Typography>
                            <Typography sx={{ fontSize: '4vh', mt: '1vh', mb: '1vh' }}>{sortedBySaleCount[0].time} : 00</Typography>
                            <Typography >{sortedBySaleCount[0].saleCount}건</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >주문이 적게 들어온 시간대</Typography>
                            <Typography sx={{ fontSize: '4vh', mt: '1vh', mb: '1vh' }}>{sortedBySaleCount[sortedBySaleCount.length - 1].time} : 00</Typography>
                            <Typography>
                                {sortedBySaleCount[sortedBySaleCount.length - 1].saleCount}건</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Typography sx={{ ml: '3vh', mb: '3vh', fontSize: '2vh', fontWeight: 550, color: '#00208c' }}>시간별 결제 금액</Typography>
            <Box sx={{ height: '50vh', width: '100%' }}>
                {SaleLineChart(saleData)}
                {CountLineChart(countData)}
            </Box>
        </Box>
    )
}
