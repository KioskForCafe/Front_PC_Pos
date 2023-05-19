import { Box, Card, CardContent, Divider, Icon, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import React from 'react'


interface props {
    byCategory: {
        categoryId: number,
        categoryName: string,
        saleCount: number,
        totalPrice: number
    }[];
}

function assignColorsToData(data: any[]) {
    const colors = ['hsl(0, 70%, 50%)', 'hsl(120, 70%, 50%)', 'hsl(240, 70%, 50%)']; // 색상 배열

    return data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length], // 배열 인덱스를 색상 배열의 길이로 나눈 나머지를 사용하여 색상 할당
    }));
}


export default function AnalysisCategoryView({ byCategory }: props) {

    const sortedCategory = byCategory.sort((a, b) => b.saleCount - a.saleCount);


    const data = assignColorsToData(
        sortedCategory.map((category) => ({
            id: category.categoryName,
            label: category.categoryName,
            value: category.saleCount,
        }))
    );


    const MyResponsivePie = (data: any) => (
        <ResponsivePie
            data={data}
            margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
            innerRadius={0.8}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={0}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            // fill={[
            //     {
            //         match: {
            //             id: 'signiture'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'americano'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'cafeLatte'
            //         },
            //         id: 'dots'
            //     }
            // ]}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )


    return (
        <Box>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Box sx={{ height: '30vh', }}>
                                {MyResponsivePie(data)}
                            </Box>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '0px 20px' }}>
                            {sortedCategory.slice(0, 3).map((category, index) => (
                                <Box sx={{ display: 'flex', p: '10px 0px' }} key={category.categoryId}>
                                    <Typography sx={{ mr: '1vh', fontSize: '2vh' }}>{index + 1}</Typography>
                                    <Typography sx={{ flex: 1, fontSize: '2vh' }}>{category.categoryName}</Typography>
                                    <Typography sx={{ textAlign: 'right', fontSize: '2vh' }}>{category.saleCount}건</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
