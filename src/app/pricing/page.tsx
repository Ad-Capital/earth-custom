"use client";

// pages/pricing.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Info, Ruler, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the canvas size type
type CanvasSize = 'mini' | 'small' | 'medium' | 'large' | 'custom';
type ComplexityLevel = 'simple' | 'standard' | 'complex';

// Type the images object
const canvasImages: Record<CanvasSize, string> = {
    mini: '/images/canvas-sizes/mini.jpg',
    small: '/images/canvas-sizes/small.jpg',
    medium: '/images/canvas-sizes/medium.jpg',
    large: '/images/canvas-sizes/large.jpg',
    custom: '/images/canvas-sizes/custom.jpg',
};

// Define interfaces for our data structures
interface PricingItem {
    type: string;
    range: string;
    description: string;
}

interface SizeInfo {
    dimensions: string[];
    pricing: PricingItem[];
}

interface Consideration {
    title: string;
    details: string[];
}

interface CustomPriceResult {
    basePrice: number;
    area: number;
}

const PricingPage = () => {
    const [selectedTab, setSelectedTab] = useState<CanvasSize>('mini');
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [complexity, setComplexity] = useState<ComplexityLevel>('standard');

    const sizeInfo: Record<CanvasSize, SizeInfo> = {
        mini: {
            dimensions: ['5"x5"', '6"x6"'],
            pricing: [
                { type: 'Single Portrait', range: '$100–$150', description: 'Small size, limited detail, ideal for simple portraits or minimalist designs.' },
                { type: 'More Than One Face', range: '$150–$200', description: 'Additional faces increase complexity and time.' },
                { type: 'Landscapes/Other Art', range: '$120–$180', description: 'Small landscapes or abstract art with moderate detail.' }
            ]
        },
        small: {
            dimensions: ['8"x10"', '11"x14"'],
            pricing: [
                { type: 'Single Portrait', range: '$200–$300', description: 'More space for detail, suitable for realistic or semi-realistic portraits.' },
                { type: 'More Than One Face', range: '$300–$400', description: 'Additional faces or group portraits require more detail and composition work.' },
                { type: 'Landscapes/Other Art', range: '$250–$350', description: 'Landscapes, still life, or abstract art with moderate to high detail.' }
            ]
        },
        medium: {
            dimensions: ['16"x20"', '20"x24"'],
            pricing: [
                { type: 'Single Portrait', range: '$400–$600', description: 'Larger canvas allows for more detail, shading, and background elements.' },
                { type: 'More Than One Face', range: '$600–$750', description: 'Group portraits or multiple subjects increase complexity and time.' },
                { type: 'Landscapes/Other Art', range: '$500–$700', description: 'Detailed landscapes, cityscapes, or intricate abstract designs.' }
            ]
        },
        large: {
            dimensions: ['24"x30"', '24"x36"'],
            pricing: [
                { type: 'Single Portrait', range: '$700–$900', description: 'Large-scale portraits with high detail, realistic shading, and complex backgrounds.' },
                { type: 'More Than One Face', range: '$900–$1000', description: 'Group portraits or multiple subjects with intricate details and backgrounds.' },
                { type: 'Landscapes/Other Art', range: '$800–$1000', description: 'Highly detailed landscapes, large abstract pieces, or complex compositions.' }
            ]
        },
        custom: {
            dimensions: ['Custom Sizes Available'],
            pricing: [
                {
                    type: 'Custom Size Calculator',
                    range: 'Calculate Below',
                    description: 'Use our calculator to get an instant estimate for your custom size.'
                },
                {
                    type: 'Base Rate',
                    range: '$0.75–$1.25/sq inch',
                    description: 'Base rate varies by complexity: Simple ($0.75), Standard ($1.00), Complex ($1.25)'
                },
                {
                    type: 'Minimum Price',
                    range: 'Starting at $150',
                    description: 'All custom pieces have a minimum price regardless of size.'
                }
            ]
        }
    };

    const additionalConsiderations: Consideration[] = [
        {
            title: 'Complexity',
            details: [
                '10–20% additional for highly detailed or intricate designs',
                '10% discount for simpler, minimalist styles'
            ]
        },
        {
            title: 'Materials',
            details: [
                '10% premium for premium materials and mix media'
            ]
        },
        {
            title: 'Turnaround Time',
            details: [
                '20% surcharge for rush orders (less than 2 weeks)'
            ]
        },
        {
            title: 'Revisions',
            details: [
                '1 free revision included',
                '$25 per additional revision'
            ]
        }
    ];

    const calculateCustomPrice = (): CustomPriceResult | null => {
        if (!width || !height) return null;

        const area = Number(width) * Number(height);
        const baseRate = {
            'simple': 0.75,
            'standard': 1.00,
            'complex': 1.25
        }[complexity];

        const basePrice = area * baseRate;
        return {
            basePrice: Math.max(150, basePrice), // Minimum price of $150
            area: area
        };
    };

    const getPlaceholderSize = (size: CanvasSize): string => {
        switch (size) {
            case 'mini': return '300/300';
            case 'small': return '400/320';
            case 'medium': return '500/400';
            case 'large':
            case 'custom': return '600/480';
            default: return '400/320';
        }
    };

    const CustomPricingCalculator = () => {
        const customPriceInfo = calculateCustomPrice();

        return (
            <div className="mt-6 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Custom Size Calculator
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label htmlFor="width">Width (inches)</Label>
                        <Input
                            id="width"
                            type="number"
                            min="4"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="Enter width"
                        />
                    </div>
                    <div>
                        <Label htmlFor="height">Height (inches)</Label>
                        <Input
                            id="height"
                            type="number"
                            min="4"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter height"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <Label htmlFor="complexity">Complexity Level</Label>
                    <Select
                        value={complexity}
                        onValueChange={(value: ComplexityLevel) => setComplexity(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="simple">Simple (Minimalist)</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="complex">Complex (Detailed)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {customPriceInfo && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow">
                        <h4 className="font-semibold mb-2">Estimated Price</h4>
                        <div className="space-y-2 text-sm">
                            <p>Canvas Area: {customPriceInfo.area} square inches</p>
                            <p>Base Price: ${customPriceInfo.basePrice.toFixed(2)}</p>
                            <p className="text-gray-600 text-xs mt-2">
                                * Final price may vary based on additional considerations (materials, rush orders, etc.)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="w-full p-4">
                <img src="logo.svg" alt="Logo" />
            </Link>
            <div className="max-w-7xl mx-auto pt-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#1E0634] mb-4">
                        Custom Art Commission Pricing
                    </h1>
                    <p className="text-lg mb-8">
                        Clear and standardized pricing for your artistic vision
                    </p>
                </div>

                <Tabs defaultValue="mini" className="w-full">
                    <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
                        <TabsTrigger value="mini">Mini</TabsTrigger>
                        <TabsTrigger value="small">Small</TabsTrigger>
                        <TabsTrigger value="medium">Medium</TabsTrigger>
                        <TabsTrigger value="large">Large</TabsTrigger>
                        {/* <TabsTrigger value="custom" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Custom
            </TabsTrigger> */}
                    </TabsList>

                    {(Object.entries(sizeInfo) as [CanvasSize, SizeInfo][]).map(([size, info]) => (
                        <TabsContent value={size} key={size}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex justify-center items-center">
                                    <div className="relative">
                                        <img
                                            src={canvasImages[size] || `/api/placeholder/${getPlaceholderSize(size)}`}
                                            alt={`${size} canvas size visualization`}
                                            className="rounded-lg shadow-lg"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow text-sm">
                                            {info.dimensions.join(' or ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-2xl">
                                                {size.charAt(0).toUpperCase() + size.slice(1)} Canvas Options
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                {info.pricing.map((item, index) => (
                                                    <div key={index} className="border-b pb-4 last:border-b-0">
                                                        <div className="flex justify-between items-baseline mb-2">
                                                            <h3 className="font-semibold text-lg">{item.type}</h3>
                                                            <span className="text-xl font-bold text-primary">
                                                                {item.range}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {size === 'custom' && <CustomPricingCalculator />}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Additional Considerations
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalConsiderations.map((consideration, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Info className="w-5 h-5" />
                                        {consideration.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {consideration.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;